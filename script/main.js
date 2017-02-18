var app = {
  rect: {}
};

var height = {
  header: 0,
  footer: 0,
  body: 0
};
var $header = $api.byId('header');
var $footer = $api.byId('footer');

app.init = function () {
  // api.parseTapmode();
  FastClick.attach(document.body);
  $api.fixStatusBar($api.byId('header'));
  $header && (height.header = $api.offset($header).h);
  $footer && (height.footer = $api.offset($footer).h);
  height.body = window.screen.height - height.header - height.footer;
  $(document).on('touchstart', '.back', function () {
    api.closeWin();
  });
  app.rect = {
          x: 0,
          y: height.header,
          w: 'auto',
          h: height.body
      };
};
app.openFrame = function (name, dirname) {
  dirname = dirname ? (dirname + '/') : '';
  api.openFrame({
      name: name,
      url: './' + dirname + name + '_frame.html',
      rect: app.rect,
      bounces: true
  });
};
app.openFrameGroup = function (name, frames, dirname) {
  dirname = dirname ? (dirname + '/') : '';
  if (typeof frames[0] == 'string') {
    frames.forEach(function (name, key) {
      frames[key] = {
        name: name,
        bounces: true,
        url: './' + dirname + name + '_frame.html'
      };
    });
  }
  api.openFrameGroup({
      name: name,
      rect: app.rect,
      scrollEnabled: false,
      frames: frames
  });
};

$api.get = $.get;
$api.post = $.post;

//用于在浏览器端测试
setTimeout(function () {
  if (typeof api != 'undefined') {
    return false;
  } else {
    window.api = false;
  }
  $api.get = $.get;
  $api.post = $.post;
  apiready && apiready();
}, 100);
