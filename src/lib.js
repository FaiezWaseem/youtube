const data = {
  videoDuration: function (duration) {
    var _$hour = parseInt(duration / 3600);
    if (_$hour < 10) {
      _$hour = "0" + _$hour;
    }
    var _$minute = parseInt((duration % 3600) / 60);
    if (_$minute < 10) {
      _$minute = "0" + _$minute;
    }
    var _$second = Math.ceil(duration % 60);
    if (_$second < 10) {
      _$second = "0" + _$second;
    }
    var _$filetime = _$hour + ":" + _$minute + ":" + _$second;
    return _$filetime;
  },
  convertTime: function (time) {
    const d = new Date(time);
    const months = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    const output =
      d.getDate() + "/" + months[d.getMonth()] + "/" + d.getFullYear();
    return output;
  },
  getPastTime: function (time) {
    const date = new Date(time);
    const timestamp = date.valueOf();
    if (typeof timestamp !== "number") return "NaN";

    const SECOND = 1000;
    const MINUTE = 1000 * 60;
    const HOUR = 1000 * 60 * 60;
    const DAY = 1000 * 60 * 60 * 24;
    const MONTH = 1000 * 60 * 60 * 24 * 30;
    const YEAR = 1000 * 60 * 60 * 24 * 30 * 12;

    const elapsed = new Date().valueOf() - timestamp;
    // const elapsed = 1541309742360 - timestamp

    if (elapsed <= MINUTE) return `${Math.round(elapsed / SECOND)}s`;
    if (elapsed <= HOUR) return `${Math.round(elapsed / MINUTE)}m`;
    if (elapsed <= DAY) return `${Math.round(elapsed / HOUR)}h`;
    if (elapsed <= MONTH) return `${Math.round(elapsed / DAY)}d`;
    if (elapsed <= YEAR) return `${Math.round(elapsed / MONTH)}mo`;
    return `${Math.round(elapsed / YEAR)}y`;
  },
  getTimeinMilli: function () {
    var d = new Date();
    return d.getTime();
  },
  numberFormat: (num) => {
    return num >= 1000000000000
      ? (num / 1000000000000).toFixed(1).replace(/\.0$/, "") + "T"
      : num >= 1000000000
      ? (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B"
      : num >= 1000000
      ? (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M"
      : num >= 1000
      ? (num / 1000).toFixed(2).replace(/\.0$/, "") + "K"
      : num;
  },
};
export default data;
