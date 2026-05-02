async function test() {
  const resp = await fetch('https://www.youtube.com/feeds/videos.xml?channel_id=UCVohdxDj7SY23bGss_qLS0w');
  console.log(resp.status);
  const text = await resp.text();
  console.log(text.substring(0, 100));
}
test();
