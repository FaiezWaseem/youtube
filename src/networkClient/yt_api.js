import Cache from "../utils/Cache";
import Storage from "../utils/AysncStorage";
import DOMParser from "react-native-html-parser";

class YtApi {
  access_key = "AIzaSyAjIZtlVfQcH8yMUPvCgc4B84dwBOOgXhs";
  alternate_key = "AIzaSyB36f-MWnKPaoErphyLywlwFPGHFKqn6MU";
  root_url = "https://www.googleapis.com/youtube/v3/";


  myserver = "http://192.210.174.131/yt/";

  constructor() {
    // this.init();
  }
  async init() {
    try {
      const isExist = await Storage.get("serverURL", Storage.DEFAULT);
      console.log(isExist);
      if (isExist) {
        this.myserver = isExist;
      }
    } catch (error) {
      this.myserver = "https://api.faiezwaseem.com/yt/";
    }
  }

  async search(query = "", maxResult = 25) {
    const response = Cache.getSessionValue(query, Cache.JSON) || null;
    if (response) {
      console.log("Search Query Loading From CACHE");
      return response;
    }
    const url =
      this.root_url +
      "search?key=" +
      this.access_key +
      "&maxResults=" +
      maxResult +
      "&part=snippet&type=video&q=" +
      query;
    let data = await fetch(url);
    const json = await data.json();
    Cache.setSessionValue(query, json, Cache.JSON);
    return json;
  }
  async comments(key = "", maxResult = 50) {
    const response = Cache.getSessionValue(key, Cache.JSON) || null;
    if (response) {
      console.log("Comments Loading From CACHE");
      return response;
    }
    const on_device = await Storage.get(key);

    if (on_device) {
      console.log("Comments Loading from device");
      return on_device;
    }
    const url =
      this.root_url +
      "commentThreads?key=" +
      this.access_key +
      "&textFormat=plainText&part=snippet&videoId=" +
      key +
      "&maxResults=" +
      maxResult;
    let data = await fetch(url);
    const json = await data.json();
    Cache.setSessionValue(key, json, Cache.JSON);
    await Storage.save(key, json);
    return json;
  }
  async videodetail(key = "") {
    const sessionKey = "video_detail_" + key;
    const response = Cache.getSessionValue(sessionKey, Cache.JSON) || null;
    if (response) {
      console.log("Loading From CACHE");
      return response;
    }
    const url =
      this.root_url +
      "videos?part=statistics&id=" +
      key +
      "&key=" +
      this.access_key;
    let data = await fetch(url);
    const json = await data.json();
    Cache.setSessionValue(sessionKey, json, Cache.JSON);
    return json;
  }
  async channeldetail(key = "") {
    const sessionKey = "channel_detail_" + key;
    const response = Cache.getSessionValue(sessionKey, Cache.JSON) || null;
    if (response) {
      console.log("Channel Detail Loading From CACHE");
      return response;
    }
    const url =
      this.root_url +
      "channels?part=statistics,snippet&id=" +
      key +
      "&key=" +
      this.access_key;
    let data = await fetch(url);
    const json = await data.json();
    Cache.setSessionValue(sessionKey, json, Cache.JSON);
    return json;
  }
  /* --------------------------------------------
  
                NON OFFICIAL APIS
   (below functions load data from third party sites)
  ---------------------------------------------- */
  async getVideoLikes(key = "") {
    const sessionKey = "video_likes_" + key;
    const response = Cache.getSessionValue(sessionKey, Cache.JSON) || null;
    if (response) {
      console.log("Video Likes Loading From CACHE");
      return response;
    }
    const req = await fetch(
      "https://returnyoutubedislikeapi.com/votes?videoId=" + key
    );
    const json = await req.json();
    Cache.setSessionValue(sessionKey, json, Cache.JSON);
    return json;
  }
  async getPopularVideos(region = "pk") {
    const req = await fetch(
      "https://alexapplication.000webhostapp.com/getPopularVideos.php?region=" +
        region
    );
    const json = await req.json();
    return json;
  }
  async getVideoDetailsAlternate(videoId = null) {
    if (videoId) {
      const req = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      );
      const json = await req.json();
      return json;
    }
  }
  //Scrapping from third party website
  // faster video url
  async getVideoURL(id) {
    const sessionKey = `getVideoURL_${id}`;
    const response = Cache.getSessionValue(sessionKey, Cache.JSON) || null;
    if (response) {
      console.log("getVideoURL Loading From CACHE");
      return response;
    }
    const res = await fetch(
      "https://10downloader.com/download?v=http://www.youtube.com/watch?v=" + id
    );
    const html = await res.text();
    const parser = new DOMParser.DOMParser();
    const parsed = await parser.parseFromString(html, "text/html");
    const btns = await parsed.getElementsBySelector(".downloadBtn");
    const video = [
      {
        url: btns?.[0].getAttribute("href"),
        format: "720p",
      },
      {
        url: btns?.[1].getAttribute("href"),
        format: "480p",
      },
    ];
    Cache.setSessionValue(sessionKey, video, Cache.JSON);
    return video;
  }

  // My Server
  async getRecommendedVideos() {
    const sessionKey = "getRecommendedVideos";
    const response = Cache.getSessionValue(sessionKey, Cache.JSON) || null;
    if (response) {
      console.log("Loading From CACHE");
      return response;
    }
    const req = await fetch(this.myserver + "?recomendedAuth=0");
    try {
      const json = await req.json();
      Cache.setSessionValue(sessionKey, json, Cache.JSON);
      return json;
    } catch (e) {
      return null;
    }
  }
  async search_query(search_query) {
    const sessionKey = "search_query_" + search_query;
    const response = Cache.getSessionValue(sessionKey, Cache.JSON) || null;
    if (response) {
      console.log("search_query From CACHE");
      return response;
    }
    const req = await fetch(this.myserver + "?search_query=" + search_query);
    try {
      const json = await req.json();
      Cache.setSessionValue(sessionKey, json, Cache.JSON);
      return json;
    } catch (e) {
      return null;
    }
  }
  async getVideoInfo(videoID = null) {
    const sessionKey = "getVideoInfo" + videoID;
    const response = Cache.getSessionValue(sessionKey, Cache.JSON) || null;
    if (response) {
      console.log("getVideoInfo Loading From CACHE");
      return response;
    }
    const req = await fetch(this.myserver + "?videoInfo=" + videoID);
    try {
      const json = await req.json();
      Cache.setSessionValue(sessionKey, json, Cache.JSON);
      return json;
    } catch (e) {
      return req;
    }
  }
  async getVideoStreamableLinks(videoID = null) {
    const req = await fetch(this.myserver + "?dwn=" + videoID);
    try {
      const json = await req.json();
      return json;
    } catch (e) {
      return req;
    }
  }
  async getSearchKeyWordSuggestion(keyword) {
    const req = await fetch(this.myserver + "?Searchsuggestion=" + keyword);
    try {
      const json = await req.json();
      return json;
    } catch (e) {
      return req;
    }
  }
  async getChannelMetaInfo(channelId = null) {
    const sessionKey = `channel_meta_${channelId}`;
    const response = Cache.getSessionValue(sessionKey, Cache.JSON) || null;
    if (response) {
      console.log("channel_meta_info Loading From CACHE");
      return response;
    }
    const req = await fetch(this.myserver + "?channel_detail=" + channelId);
    const json = await req.json();
    Cache.setSessionValue(sessionKey, json, Cache.JSON);
    return json;
  }
  async getChannelFeatured(channelId = null) {
    const sessionKey = `channel_featured_${channelId}`;
    const response = Cache.getSessionValue(sessionKey, Cache.JSON) || null;
    if (response) {
      console.log("channel_meta_info Loading From CACHE");
      return response;
    }
    const req = await fetch(this.myserver + "?channel_feature=" + channelId);
    const json = await req.json();
    Cache.setSessionValue(sessionKey, json, Cache.JSON);
    return json;
  }
  async getChannelLive(channelId = null) {
    const sessionKey = `channel_live_${channelId}`;
    const response = Cache.getSessionValue(sessionKey, Cache.JSON) || null;
    if (response) {
      console.log("channel_meta_info Loading From CACHE");
      return response;
    }
    const req = await fetch(this.myserver + "?channel_live=" + channelId);
    const json = await req.json();
    Cache.setSessionValue(sessionKey, json, Cache.JSON);
    return json;
  }
  async getChannelAbout(channelId = null) {
    const sessionKey = `channel_about_${channelId}`;
    const response = Cache.getSessionValue(sessionKey, Cache.JSON) || null;
    if (response) {
      console.log("channel_meta_info Loading From CACHE");
      return response;
    }
    const req = await fetch(this.myserver + "?channel_about=" + channelId);
    const json = await req.json();
    Cache.setSessionValue(sessionKey, json, Cache.JSON);
    return json;
  }
  async getChannelCommunity(channelId = null) {
    const sessionKey = `channel_about_${channelId}`;
    const response = Cache.getSessionValue(sessionKey, Cache.JSON) || null;
    if (response) {
      console.log("channel_meta_info Loading From CACHE");
      return response;
    }
    const req = await fetch(this.myserver + "?channel_community=" + channelId);
    const json = await req.json();
    Cache.setSessionValue(sessionKey, json, Cache.JSON);
    return json;
  }
  async getChannelVideos(channelId = null) {
    const sessionKey = `channel_videos_${channelId}`;
    const response = Cache.getSessionValue(sessionKey, Cache.JSON) || null;
    if (response) {
      console.log("channel_videos Loading From CACHE");
      return response;
    }
    const req = await fetch(this.myserver + "?channel_videos=" + channelId);
    const json = await req.json();
    Cache.setSessionValue(sessionKey, json, Cache.JSON);
    return json;
  }
  async getChannelShorts(channelId = null) {
    const sessionKey = `channel_shorts_${channelId}`;
    const response = Cache.getSessionValue(sessionKey, Cache.JSON) || null;
    if (response) {
      console.log("channel_shorts Loading From CACHE");
      return response;
    }
    const req = await fetch(this.myserver + "?channel_shorts=" + channelId);
    const json = await req.json();
    Cache.setSessionValue(sessionKey, json, Cache.JSON);
    return json;
  }
  async getChannelPlayList(channelId = null) {
    const sessionKey = `channel_playlist_${channelId}`;
    const response = Cache.getSessionValue(sessionKey, Cache.JSON) || null;
    if (response) {
      console.log("channel_playlist Loading From CACHE");
      return response;
    }
    const req = await fetch(this.myserver + "?channel_playlist=" + channelId);
    const json = await req.json();
    Cache.setSessionValue(sessionKey, json, Cache.JSON);
    return json;
  }
  async getComments(nextToken = null) {
    const sessionKey = `getComments_${nextToken}`;
    const response = Cache.getSessionValue(sessionKey, Cache.JSON) || null;
    if (response) {
      console.log("getComments Loading From CACHE");
      return response;
    }
    const req = await fetch(this.myserver + "?getComments=" + nextToken);
    const json = await req.json();
    Cache.setSessionValue(sessionKey, json, Cache.JSON);
    return json;
  }
  async getReplyComments(nextToken = null) {
    const sessionKey = `getReplyComments_${nextToken}`;
    const response = Cache.getSessionValue(sessionKey, Cache.JSON) || null;
    if (response) {
      console.log("getReplyComments Loading From CACHE");
      return response;
    }
    const req = await fetch(this.myserver + "?getReplyComments=" + nextToken);
    const json = await req.json();
    Cache.setSessionValue(sessionKey, json, Cache.JSON);
    return json;
  }
  async loadmoreSearches(nextToken = null) {
    const sessionKey = `loadmoreSearches_${nextToken}`;
    const response = Cache.getSessionValue(sessionKey, Cache.JSON) || null;
    if (response) {
      console.log("getComments Loading From CACHE");
      return response;
    }
    const req = await fetch(this.myserver + "?getSearchNext=" + nextToken);
    const json = await req.json();
    Cache.setSessionValue(sessionKey, json, Cache.JSON);
    return json;
  }
  async getHomeNext(nextToken = null) {
    const sessionKey = `HomeNext_${nextToken}`;
    const response = Cache.getSessionValue(sessionKey, Cache.JSON) || null;
    if (response) {
      console.log("HomeNext Loading From CACHE");
      return response;
    }
    const req = await fetch(this.myserver + "?getHomeNext=" + nextToken);
    const json = await req.json();
    Cache.setSessionValue(sessionKey, json, Cache.JSON);
    return json;
  }
}
export default new YtApi();
