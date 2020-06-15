$(document).ready(function () {
  $("meta[property=og\\:image]").attr("content", $("#img").attr("src"));
  $("meta[property=og\\:url]").attr("content", $("#slug").text());
  $("meta[property=og\\:description]").attr("content", $("#title").text());
  $("meta[property=og\\:title]").attr("content", "Anouma News");
});
