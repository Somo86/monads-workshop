import Maybe from './monads-class/Maybe';
import {
  getUserBanner,
  user,
  banners,
  getProvinceBanner,
  applyBanner
} from './data';

// Provide a default banner with .orElse()
var bannerSrc = getUserBanner(user)
  .orElse('/assets/banners/default-banner.jpg');

// Grab the banner element and wrap it in a Maybe too.
var bannerEl = Maybe.of(document.querySelector('.banner > img'));

bannerEl.map(applyBanner).ap(bannerSrc);
