const { admin } = require('./admin');

exports.auth = (request, response, next) => {
	let idToken;
	if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
		idToken = request.headers.authorization.split('Bearer ')[1];
	} else {
		console.error('No token found');
		return response.status(403).json({ error: 'Unauthorized' });
	}
	const retVal = admin
		.auth()
		.verifyIdToken(idToken)
		.then((decodedToken) => {
			request.user = decodedToken;
            return true;
		})
		.catch((err) => {
			console.error('Error while verifying token', err);
			return response.status(403).json(err);
		});
	return retVal;
};