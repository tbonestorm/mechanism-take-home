This project is a take home assignment for Mechanism 

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `firebase serve`
This will run the functions locally which will retrieve and update the stocks for a given user.

## Notes

Some assumptions were made:

1.  Every user could enter stocks only for themselves
2.  The graph is basic.  showing your stocks in comparison with the market indexes provided
3.  The api used to retrieve the data isnt perfect.  It could become a complicated calculation to determine when stocks were added, and trying to figure out work out the overall benefit or not of whether investing in the market would have been more successful.  Having said that, the base graph assumes 1 yr data and even the portfolio was added that day.
4.  Since your portfolio stocks may not have been purchased at market, do not enforce market conditions for that day.
5.  Instead of managing users fully, used a federated google login.  Saved time and also personally i find it much more useful.

