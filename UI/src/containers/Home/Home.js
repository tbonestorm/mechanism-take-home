import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import _ from 'lodash';
import Loading from '../../components/Loading/Loading';
import { Button, makeStyles, MenuItem, Select } from '@material-ui/core';
import useAppJwt from '../../hooks/useAppJwt';
import AddTicker from '../../components/AddTicker/AddTicker';

const axiosOptions = {
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
    'x-rapidapi-host': process.env.REACT_APP_RAPID_API_HOST,
  }
};

const useStyles = makeStyles((theme) => ({
  dropDown: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 15,
  },
}));

const Home = () => {
  const [labels, setLabels] = useState([]);
  const [series, setSeries] = useState([]);
  const [portfolioLoaded, setPortfolioLoaded] = useState(false);
  const [indexLoaded, setIndexLoaded] = useState(false);
  const [open, setOpen] = useState(false); // modal
  const [portfolioInitialTotal, setPortfolioInitialTotal] = useState(0); // for bottom label
  const [portfolioStockCount, setPortfolioStockCount] = useState(0);
  const [portfolioFinalTotal, setPortfolioFinalTotal] = useState(0); // for bottom label
  const [indexFinalTotal, setIndexFinalTotal] = useState(0); // for bottom label
  const { appToken, isAuthenticated } = useAppJwt();
  const [indexTicker, setIndexTicker] = useState(''); // initial index state
  const classes = useStyles();

  const loadPortfolioData = useCallback(async () => {
    const portfolioData = await axios.get(process.env.REACT_APP_PORFOLIO_SERVICE, {
      headers: {
        'Authorization': `Bearer ${appToken}`,
      }
    });
    
    const portfolioValue = _.map(portfolioData.data, (stock) => {
      return parseFloat(stock.valueOnAquired) * parseInt(stock.units);
    });
    setPortfolioStockCount(portfolioData.data.length);
    setPortfolioInitialTotal(_.sum(portfolioValue));

    const tickers = _.map(portfolioData.data, (stock) => {
      return stock.ticker;
    });

    const requests = [];
    // setup the axios requests for the portfolio tickers
    _.forEach(tickers, (ticker) => {
       requests.push(axios.get(`${process.env.REACT_APP_QUOTE_SERVICE}/get-chart?interval=1d&symbol=${ticker}&range=1y&region=US`, axiosOptions));
    });

    axios.all(requests).then(axios.spread((...responses) => {
      const newSeries = [];
      let portfolioTotal = 0;
      let i = 0;
      _.forEach(responses, (response) => {
        const quotes = _.get(response.data, 'chart.result[0].indicators.quote[0].close', []);
        quotes[0] = portfolioValue[i]; // initial investment

        var j;
        for (j = 1; j < quotes.length; j++) {
          quotes[j] = quotes[j] * 100;
        }
        portfolioTotal += quotes[quotes.length - 1];
        newSeries.push({
              name: tickers[i],
              type: 'spline',
              data: quotes,
            });
        i++;
      });

      const updatedLabels = _.map(_.get(responses[0], 'data.chart.result[0].timestamp', []), (dt) => {
        const d = new Date(0);
        d.setUTCSeconds(dt);
        return d.toLocaleDateString("en-US");
      });
      setPortfolioFinalTotal(portfolioTotal);
      setSeries(newSeries);
      setLabels(updatedLabels);
      setPortfolioLoaded(true);
    }))
  }, [appToken]);

  const loadData = useCallback(async () => {
    if (indexTicker === '') return;
    const one = `${process.env.REACT_APP_QUOTE_SERVICE}/get-chart?interval=1d&symbol=${indexTicker}&range=1y&region=US`;
    const requestOne = axios.get(one, axiosOptions);
    // this could be a single call, but left in in case might want to call multiple index for comparisons.
    axios.all([requestOne]).then(axios.spread((...responses) => {
      const responseOne = responses[0]
      const newSeries = _.cloneDeep(series);
      if (newSeries.length !== portfolioStockCount) {
        newSeries.splice(newSeries.length - 1); // remove last index
      }
      const data = _.get(responseOne.data, 'chart.result[0].indicators.quote[0].close', []);
      const initialUnits = portfolioInitialTotal / data[0];
      const formattedData = _.map(data, (d) => {
        return d > 0 ? initialUnits * d : 0;
      });
      setIndexFinalTotal(formattedData[formattedData.length - 1]);
      newSeries.push({
        name: indexTicker,
        type: 'spline',
        data: formattedData,
      });
      setIndexLoaded(true);
      setSeries(newSeries);
    })).catch((errors) => {
      console.log("Error getting data", errors);
    });
  }, [indexTicker, portfolioInitialTotal, series, portfolioStockCount]);

  useEffect(() => {
    // no point loading indexes to compare if no portfolio value loaded
    if (portfolioInitialTotal > 0 && !indexLoaded) {
      loadData();
    }
  }, [loadData, portfolioInitialTotal, indexLoaded]);
 
  useEffect(() => {
    if (!_.isEmpty(appToken) && !portfolioLoaded) {
      loadPortfolioData()
    }
  }, [portfolioLoaded, appToken, loadPortfolioData])

  if (!portfolioLoaded || !isAuthenticated) return <Loading />;

  const chartOptions = {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'My Portfolio'
    },
    xAxis: {
      categories: labels,
    },
    series: series,
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (isNewStock) => {
    setOpen(false);
    if (isNewStock) {
      setPortfolioLoaded(false);
      setIndexTicker('');
    }
  };

  const onIndexChange = (event) => {
    setIndexTicker(event.target.value);
    setIndexLoaded(false);
  }

  const TotalsLabel = () => {
    if (indexFinalTotal > 0) {
      return (
        <div>Based on your initial investment, the difference in choosing the market index ({indexTicker}) vs your stocks is: ${Math.round(portfolioFinalTotal - indexFinalTotal)}</div>
      )
    }
    return null;
  };

  return (
    <div>
       <div className={classes.dropDown}>
        Choose your market index
        <Select value={indexTicker} onChange={onIndexChange} variant="outlined">
          <MenuItem value="NDX">NASDAQ</MenuItem>
          <MenuItem value="DJU">Dow Jones Average</MenuItem>
          <MenuItem value="^GSPC">S&P 500</MenuItem>
        </Select>
      </div>
      {series.length > 0 ? <HighchartsReact highcharts={Highcharts} options={chartOptions} /> : null}
      <Button onClick={handleOpen} color="primary">Add Ticker</Button>
      <AddTicker open={open} handleClose={handleClose}>Test</AddTicker>
      <div>Your initial investment: ${portfolioInitialTotal}</div>
      <TotalsLabel />
    </div>
  );
};

export default Home;
