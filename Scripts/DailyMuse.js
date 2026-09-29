/*!
DailyMuse 每日一句 — Loon/Egern 双端兼容
Loon 通知附件键: mediaUrl ; Egern(Surge 分支): media-url —— 同时携带, 各取所需
*/
var type = (typeof $argument !== "undefined" && $argument && $argument.type) ? $argument.type : "文学";
var code = {"音乐":"j","网络":"f","文学":"d","诗词":"i","影视":"h","动画":"a","游戏":"c","哲学":"k","原创":"e","机灵":"l"}[type] || "d";
var url = "https://v1.hitokoto.cn/?c=" + code;
var image = "https://api.yujn.cn/api/heisi.php";

function notify(title, body, withImage) {
  var attach = withImage ? { "mediaUrl": image, "media-url": image, "openUrl": url, "open-url": url } : null;
  try {
    $notification.post(title, "", body, attach);
  } catch (e) {
    $notification.post(title, "", body);
  }
}

$httpClient.get(url, (error, response, body) => {
  if (error) {
    console.log("每日一句\n请求失败：" + error);
    notify("每日一句", "请求失败" + error, false);
    $done();
    return;
  }
  var text = body;
  try { text = JSON.parse(body).hitokoto || body; } catch (e) {}
  console.log(`每日一句\n\n${text}`);
  notify("每日一句", text, true);
  $done();
});
