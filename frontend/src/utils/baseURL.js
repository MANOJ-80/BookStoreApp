const getBaseUrl = () => {
    // Check if the environment is development or production
    if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:5000';
    } else {
        return 'https://book-store-backend-gamma-self.vercel.app';
    }
};

export default getBaseUrl;
