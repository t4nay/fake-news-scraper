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
		case 'www.maharlikanews.com':
        return await maharlikanews(r, $);
		case 'ilikeyouquotes.blogspot.com':
        return await ilikeyouquotes(r, $);
		case 'philnewscourier.blogspot.com':
			return await philnewscourier(r, $);
		case 'pinoynewsblogger.blogspot.com':
			return await pinoynewsblogger(r, $);
		case 'pinoytrendingnews.net':
			return await pinoytrendingnews(r, $);
		case 'pinoytrendingnewsph.blogspot.com':
			return await pinoytrendingnewsph(r, $);
		case 'pinoytrending.altervista.org':
			return await pinoytrending(r, $);
		case 'www.tahonews.com':
			return await tahonews(r, $);
		case 'www.thenewsfeeder.net':
			return await thenewsfeeder(r, $);

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
async function maharlikanews(r, $){

    const txt = $('#the-post > div > h1 > span').text()
		$('#the-post > div > div.entry > section > ul:nth-child(42)').remove();
    const article = $('#the-post > div > div.entry').text();
    console.log(JSON.stringify({title: txt, text: article}));
    return JSON.stringify({title: txt, text: article})
}
async function okd2(r, $){
  const articleId = $('#page > div > article')[0]['children'][1]['attribs']['id'];
  console.log(articleId);

    const txt = $('#' + articleId+ ' > div > header > h1').text()
		$('#content > ul').remove();
		$('#u_0_0 > div > div').remove();
		$('#content > div.tags').remove();
		$('#content > h3.coments-title').remove();
		$('#content > p:nth-child(26)').remove();
		$('#content > div.sharedaddy.sd-sharing-enabled > div').remove();
		$('#wp_rp_first').remove();
		$('#content > div.fb-comments.fb_iframe_widget.fb_iframe_widget_fluid_desktop').remove();

    const article = $('#content').text();
    console.log(JSON.stringify({title: txt, text: article}));
    return JSON.stringify({title: txt, text: article})
}
async function ilikeyouquotes(r, $){
  const articleId = $('#Blog1 > div.blog-posts.hfeed > div > div > div > div.post.hentry > div > article')[0]['children'][1]['attribs']['id'];
console.log(articleId);
    const txt = $('#Blog1 > div.blog-posts.hfeed > div > div > div > div.post.hentry > div > div.post-header > div.post-head > h1').text()
	$('#'+articleId+'> center:nth-child(10)').remove();
	$('#Blog1 > div.blog-posts.hfeed > div > div > div > div.post.hentry > div > article > div.second-meta').remove();
	  const article = $('#Blog1 > div.blog-posts.hfeed > div > div > div > div.post.hentry > div > article').text();
    console.log(JSON.stringify({title: txt, text: article}));
    return JSON.stringify({title: txt, text: article})
}
async function philnewscourier(r, $){
    const txt = $('#Blog1 > div.blog-posts.hfeed > div > div > div > div.post.hentry.uncustomized-post-template > h3').text()
const articleId = $("*[itemprop = 'postId']").get(0).attribs.content;
		$('#the-post > div > div.entry > section > ul:nth-child(42)').remove();
    const article = $('#post-body-' + articleId).text();
    console.log(JSON.stringify({title: txt, text: article}));
    return JSON.stringify({title: txt, text: article})
}
async function pinoynewsblogger(r, $){
const articleId = $("*[itemprop = 'blogPost']").get(0).attribs.id;
const titleId =articleId.substring(1);

    const txt = $('#\\37 '+titleId+ ' > h1 > a').text();
    const article = $('#post-body-' + articleId).text();
    console.log(JSON.stringify({title: txt, text: article}));
    return JSON.stringify({title: txt, text: article})
}
async function pinoytrendingnews(r, $){
  const articleId = $('#content_box')[0]['children'][1]['attribs']['id'];
	    console.log(articleId);


    const txt = $('#'+articleId+ ' > div.single_post > header > h1').text();
		$('#' +articleId +' > div.single_post > div > div.shareit.share-social-icons.bottom').remove();
    const article = $('#' + articleId+ ' > div.single_post > div').text();
    console.log(JSON.stringify({title: txt, text: article}));
    return JSON.stringify({title: txt, text: article})
}
async function pinoytrendingnewsph(r, $){
    const txt = $('#Blog1 > div.blog-posts.hfeed > div > div > div > div.post-header > div.post-head > h1').text();
    const article = $('#Blog1 > div.blog-posts.hfeed > div > div > div > article').text();
    console.log(JSON.stringify({title: txt, text: article}));
    return JSON.stringify({title: txt, text: article})
}
async function pinoytrending(r, $){
	  const articleId = $('#content')[0]['children'][1]['attribs']['id'];
	    console.log(articleId);
			    $('#' + articleId +' > div > div.av-social-share.av-social-type-text-icon.av-social-share-top').remove();

    const txt = $('#' + articleId +' > header > h1').text();
    const article = $('#' + articleId +' > div').text();
    console.log(JSON.stringify({title: txt, text: article}));
    return JSON.stringify({title: txt, text: article})
}
async function tahonews(r, $){

    const txt = $('#single > div > div > div > article > header > div.meta > h1').text();
    const article = $('#single > div > div > div > article > section > div.text').text();
    console.log(JSON.stringify({title: txt, text: article}));
    return JSON.stringify({title: txt, text: article})
}
async function thenewsfeeder(r, $){
const articleId = $("*[itemprop = 'articleBody']").get(0).attribs.id;
console.log(articleId);
    const txt = $('#Blog1 > div.blog-posts.hfeed > div > div > div > article > h3 > a').text();
    const article = $('#'+articleId).text();
    console.log(JSON.stringify({title: txt, text: article}));
    return JSON.stringify({title: txt, text: article})
}
