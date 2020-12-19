var flag = true;     //正常地图和卫星地图标志位（true为正常地图，false为卫星地图）
$(document).ready(function(){
	//获取数据
	getData();
	//菜单滑动事件
	$(".input-card .styleSelect").click(function(){
		$(".styleMap").slideToggle("slow");
	});
	$(".input-card .dateSelect").click(function(){
		$(".dateMap").slideToggle("slow");
	});
});

//卫星图和路网
var satellite = new AMap.TileLayer.Satellite();
var roadNet = new AMap.TileLayer.RoadNet();

//创建地图实例
var map = new AMap.Map('container', {
	mapStyle: 'amap://styles/1aa56cf34140a13e4f5f7ac20f1654d9',
	// features: ['bg','road'],
	center: [111.6, 11.2],
	zoom: 6,
	pitch: 46,
	viewMode: '3D',
});

//创建可视化图层
var layer = new Loca.LineLayer({
	map: map,
});

function getData(){
	//加载数据
	$.get("http://127.0.0.1/frequentData/frequent.json", function (data) {
		var colors = ['#07E8E4','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cc99ff','#00ff00'];
		
		// lines = [{"linePath":[[116.32402,39.896538],[116.323349,39.896526],[116.323349,39.89687],[116.328559,39.896845],[116.328549,39.89731],[116.321907,39.89724],[116.321281,39.898571],[116.321258,39.907426],[116.335434,39.907227],[116.335533,39.909328],[116.33476,39.911563],[116.334545,39.91279],[116.334561,39.91404],[116.355064,39.913834],[116.356895,39.91396],[116.356583,39.920521],[116.356377,39.921619],[116.355537,39.941948],[116.355621,39.942657],[116.35614,39.943516],[116.356285,39.944717],[116.356461,39.945057],[116.356461,39.948833],[116.356354,39.949722],[116.355423,39.953217],[116.354286,39.976486],[116.393028,39.976826],[116.394157,39.976372],[116.394279,39.97177]]}];
		
		layer.setData(data, {
			lnglat: 'linePath'
		});
	
		layer.setOptions({
			style: {
				// 3D Line 不支持设置线宽，线宽为 1px
				// borderWidth: 3,
				opacity: 0.4,
				color: function(v){
					var id = v.value.line_id;
					if(id == 0)
						return colors[0];
					else if(id == 1)
						return colors[1];
					else if(id == 2)
						return colors[2];
					else if(id == 3)
						return colors[3];
					else if(id == 4)
						return colors[4];
					else if(id == 5)
						return colors[5];
					else if(id == 6)
						return colors[6];
					else if(id == 7)
						return colors[7];
					else if(id == 8)
						return colors[8];
					else
						return colors[9];
				},
			}
		});
	
		layer.render();
	}).fail(function(){
		alert("无数据记录！");
	});
}


//绑定radio点击事件
var radios = document.querySelectorAll(".styleMap input");
radios.forEach(function(ratio) {
  ratio.onclick = setMapStyle;
});
function setMapStyle() {
  var styleName = "amap://styles/" + this.value;
  map.setMapStyle(styleName);
}

//切换卫星地图事件
$(".mapSelect").click(function(){
	if(flag == true){
		map.setLayers([satellite, roadNet]);
		layer = new Loca.LineLayer({
			map: map,
		});
		getData();
		$(".mapSelect").html("切换正常地图");
		flag = false;
	}else{
		map = new AMap.Map('container', {
			mapStyle: 'amap://styles/1aa56cf34140a13e4f5f7ac20f1654d9',
			// features: ['bg','road'],
			center: [111.6, 11.2],
			zoom: 6,
			pitch: 46,
			viewMode: '3D',
		});
		layer = new Loca.LineLayer({
			map: map,
		});
		getData();
		$(".mapSelect").html("切换卫星地图");
		flag = true;
	}
	
});

//绑定菜单栏点击事件
//轨迹可视化
$(".trajVisual").click(function(){
	window.location.href = "index.html";
});
//频繁模式
$(".frequent").click(function(){
	window.location.href = "frequent.html"
});
//周期模式
$(".period").click(function(){
	window.location.href = "period.html";
});
//共现模式
$(".occur").click(function(){
	alert("共现模式");
});
//异常模式
$(".abnormal").click(function(){
	alert("异常模式");
});
//目标识别分类
$(".classify").click(function(){
	alert("目标识别分类");
});