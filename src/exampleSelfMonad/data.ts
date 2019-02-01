import * as R from 'ramda';
import Maybe from './monads-class/Maybe';

export var user = {
  email: 'james@example.com',
  accountDetails: {
    address: {
      street:   '123 Fake St',
      city:     'Exampleville',
      province: 'AB',
      postcode: '1234'
    }
  },
  preferences: {}
};

export var banners = {
  'AB': '/assets/banners/alberta.jpg',
  'BC': '/assets/banners/british-columbia.jpg',
  'MB': '/assets/banners/manitoba.jpg',
  'NL': '/assets/banners/newfoundland-labrador.jpg',
  'NS': '/assets/banners/nova-scotia.jpg',
  'NT': '/assets/banners/northwest-territories.jpg',
  'ON': '/assets/banners/ontario.jpg',
  'PE': '/assets/banners/prince-edward.jpg',
  'QC': '/assets/banners/quebec.jpg',
  'SK': '/assets/banners/saskatchewan.jpg',
  'YT': '/assets/banners/yukon.jpg',
};

export var getProvinceBanner = function(province) {
  return Maybe.of(banners[province]);
};

export function getUserBanner(user) {
  return Maybe.of(user)
    .map(R.prop('accountDetails'))
    .map(R.prop('address'))
    .map(R.prop('province'))
    .map(getProvinceBanner)
    .deep();
}

export var applyBanner = R.curry(function(el, banner) {
  el.src = banner;
  return el;
});
