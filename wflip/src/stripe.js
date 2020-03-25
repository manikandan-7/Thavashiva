const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_test_LSKxLUOC5NqU8bbOHA2SNIkI00dTgGEV0n'
  : 'pk_test_LSKxLUOC5NqU8bbOHA2SNIkI00dTgGEV0n';

export default STRIPE_PUBLISHABLE;