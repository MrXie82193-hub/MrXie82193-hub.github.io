function heartWith(body) {
    this.body = body;
    this.init = function(){
        this.monitor();
    };
    this.monitor = function () {
        var that = this;
        document.onmousemove = function (event) {
            var heart = document.createElement("div");
            heart.className = "heart-with";
            var x = event.pageX, y = event.pageY;
            // 设置heart跟随鼠标的位置出现
            heart.style.left = x + "px", heart.style.top = y + "px";
            // 设置heart的大小随机 Math.random()返回一个0~1之间的数
            var size = Math.random() * 30;
            heart.style.width = size + "px", heart.style.height = size + "px";
            // 将heart添加到body下
            that.body.appendChild(heart);
            // 设置定时器，两秒钟情理一次heart
            setInterval(function () {
                heart.remove();
            }, 2000);
        }
    };
    this.init();
}
