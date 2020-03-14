const cheerio = require('cheerio');
const requests = require("request-promise");
var Url = require('url-parse');
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({
	extended: false
}))


app.listen(3000, () => console.log('Listening on port ' + 3000))
app.get('/', function (request, response) {
  	console.log(request.query);
    const url = request.query.url;
(async () => {
  console.log(url);
var urlParsed = new Url(url);
const host = urlParsed['host'];
console.log(host)
const r = await requests.get(url);
const $ = cheerio.load(r);
const responses = await scrape(r, $, host);
response.send(responses);





})();
});
async function scrape(r, $,  host){
  switch(host) {
    case 'akoy-pilipino.blogspot.com':
      return await akoypilipio(r, $);
    case 'www.allthingspinoy.com':
      return await allthingspinoy(r, $);
    case 'www.asianpolicy.press':
      return await asianpolicy(r, $);
    case 'balitangpanglahat.info':
      return await balitangpanglahat(r, $);
    case 'www.dailyartikulo.info':
      return await asianpolicy(r, $);
    case 'dailyfilipino.altervista.org':
      return await dailyfilipino(r, $);
      case 'dutertetrendingnews.blogspot.com':
        return await dutertetrendingnews(r, $);
      case 'www.lugto.com':
        return await lugto(r, $);
      case 'grpshorts.blogspot.com':
        return await grpshorts(r, $);
  }
}

async function akoypilipio(r, $){
  const txt = $('#Blog1 > div.blog-posts.hfeed > div > div.post > div > div.post-header > div.post-head').text()
  $('#Blog1 > div.blog-posts.hfeed > div > div.post > div > article > p').remove()
  const article = $('#Blog1 > div.blog-posts.hfeed > div > div.post > div > article').text();
  console.log(JSON.stringify({title: txt, text: article}));
  return JSON.stringify({title: txt, text: article})
}
async function allthingspinoy(r, $){
    const txt = $('body > div.w100.bg-w > div > div > div.primary > h1').text()
    const article = $('body > div.w100.bg-w > div > div > div.primary > div.entry-content > p:nth-child(2)').text();
    console.log(JSON.stringify({title: txt, text: article}));
    return JSON.stringify({title: txt, text: article})
}
async function asianpolicy(r, $){

    const txt = $('#Blog1 > div.blog-posts.hfeed > div.post-outer > div.post > div > div.post-header > div.post-head > h1').text()
    const articleId = $('#Blog1 > div.blog-posts.hfeed > div > div.post > div > article')[0]['children'][1]['attribs']['id'];
      $(articleId + ' > meta').remove();

    const article = $('#Blog1 > div.blog-posts.hfeed > div > div.post > div > article').text();
    console.log(JSON.stringify({title: txt, text: article}));
    return JSON.stringify({title: txt, text: article})
}
async function balitangpanglahat(r, $){
  const articleId = $('#main')[0]['children'][1]['attribs']['id'];
    const txt = $('#' + articleId+ ' > div.entry-content-wrap > header > div.header-details-wrapper > div > h1').text()
      $('#' + articleId + ' > div.entry-content-wrap > div > div.juiz_sps_links.counters_both.juiz_sps_displayed_bottom > p').remove();
      $('#' + articleId + ' > div.entry-content-wrap > div > div.juiz_sps_links.counters_both.juiz_sps_displayed_bottom > ul').remove();
      $('#' + articleId + ' > div.entry-content-wrap > div > nav').remove();

    const article = $('#' + articleId+ ' > div.entry-content-wrap > div').text();
    console.log(JSON.stringify({title: txt, text: article}));
    return JSON.stringify({title: txt, text: article})
}
async function dailyfilipino(r, $){
  const articleId = $('#content')[0]['children'][1]['attribs']['id'];
  console.log(articleId);
    const txt = $('#' + articleId+ ' > div.article-content.clearfix > header > h1').text()
    $('#jp-relatedposts').remove();
      $('#' + articleId + ' #like-post-wrapper-133265842-1383-5e6c44ff0bbfc').remove();
      $('#' + articleId + ' > div.article-content.clearfix > div.entry-content.clearfix > div.sharedaddy.sd-sharing-enabled').remove();
      $('#' + articleId + ' > div.article-content.clearfix > div.entry-content.clearfix > div.av-social-share.av-social-type-text-icon.av-social-share-top').remove();

    const article = $('#' + articleId+ ' > div.article-content.clearfix > div.entry-content.clearfix').text();
    console.log(JSON.stringify({title: txt, text: article}));
    return JSON.stringify({title: txt, text: article})
}
async function dutertetrendingnews(r, $){

    const txt = $('#Blog1 > div.blog-posts.hfeed > div > div > div > div.post.hentry.uncustomized-post-template > h3').text()
const articleId = $("*[itemprop = 'postId']").get(0).attribs.content;

    const article = $('#post-body-' + articleId).text();
    console.log(JSON.stringify({title: txt, text: article}));
    return JSON.stringify({title: txt, text: article})
}
async function lugto(r, $){

    const txt = $('#Blog1 > div.blog-posts.hfeed > div > div > div.post-outer > div.post.hentry > div > div.post-header > div.post-head > h1').text()

      $('#adsense-target > center:nth-child(30)').remove();

    const article = $('#adsense-target').text();
    console.log(JSON.stringify({title: txt, text: article}));
    return JSON.stringify({title: txt, text: article})
}
async function grpshorts(r, $){

    const txt = $('#Blog1 > div > article > div.post-outer > div > h3').text()
          $('#Blog1 > div > article > div.post-outer > div > h3').remove();
          $('#Blog1 > div > article > div.post-outer > div > div.post-share-buttons.post-share-buttons-top').remove();
          $('#Blog1 > div > article > div.post-outer > div > div.post-bottom > div.post-share-buttons.post-share-buttons-bottom').remove();
          $('#Blog1 > div > article > div.post-outer > div > div.post-header > div').remove();
    const article = $('#Blog1 > div > article > div.post-outer > div').text();
    console.log(JSON.stringify({title: txt, text: article}));
    return JSON.stringify({title: txt, text: article})
}
