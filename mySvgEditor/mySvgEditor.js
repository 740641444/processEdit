
// const baseURL = process.env.VUE_APP_BASE_API

var myCanvasEditor = {
    data: {
        container: {},//渲染canvas的控制器
        myCanvasObj: {},//画布对象
        configData: {},//配置数据
        nodeShape: {
            nodeNormal: {//人工活动-一对圆角
                height: 64,
                width: 120,
                borderColor: '#967CF8',
                borderColorLinearGradientFlag: true,//是否开启边框颜色渐变
                borderColorLinearGradient: {
                    start: '#967CF8',
                    // start: 'red',
                    end: '#B4A0FF',
                    // end: 'blue'
                },
                borderRadius: 15,//圆角
                backgroundColor: "rgba(255,255,255,0.6)",
                fontColor: "#303133"
            }
        }
    },
    myCanvasDefault: {//默认属性
        borderColor: '#000000',//默认线框颜色-黑色
        graphPadding: 20
    },
    cell: [],//所有节点数据
    nodes: [],//所有节点数据
    edges: [],//所有节点数据

    // 初始化画布
    initGraph(obj) {
        console.log('initGraph',obj)
        this.data.configData = {...obj};//获取配置信息
        this.data.container = this.data.configData.container;//获取控制元素
        // 生成canvas节点并放入节点
        this.data.myCanvasObj = document.createElement('canvas');
        this.data.container.appendChild(this.data.myCanvasObj);
        // this.data.myCanvasObj.width = this.data.container.offsetWidth; // 设置宽高
        // this.data.myCanvasObj.height = this.data.container.offsetHeight; // 设置宽高
        this.data.myCanvasObj.width = 2000; // 设置宽高
        this.data.myCanvasObj.height = 2000; // 设置宽高
        // 设置画布样式
        this.initBackground();
        // 设置画布网格
        this.initGrid();
        // 设置画布事件
        this.initEvent();
        // this.data.myCanvasObj.height = 500;
        return this
    },
    // 添加边edge
    addEdge(node) {
        let reData ={};
        // if (!this.data.nodeShape[node.shape]) {//判断是否注册节点
        //     reData = "没有节点"
        //     return reData
        // }
        
        // if (node.shape == 'nodeNormal') {//人工节点类型的节点
        //     node.style = this.data.nodeShape[node.shape];//获取对应节点类型的样式
        //     this.addnodeNormal(node);
        // }
        this.drawEdge(node);

        this.edges.push(node);//记录画布中边节点
        
        // console.log("符合条件的节点",this.cell)
        reData = "有节点"
        return reData
    },
    // 画边
    drawEdge(node) {
        console.log("画边");
        node.source = typeof node.source == 'string' ? {
            cell: node.source
        } : node.source;
        node.target = typeof node.target == 'string' ? {
            cell: node.target
        } : node.target;

        console.log("看看找到的两个节点",node)
        let source = {};
        let target = {};
        for (let item of this.nodes) {
            if (item.id == node.source.cell) {
                source = item
            }
            if (item.id == node.target.cell) {
                target = item
            }
        }

        console.log("看看找到的两个节点",source,target)


        
        let ctx = this.data.myCanvasObj.getContext("2d");
        //设置线条颜色
        // ctx.strokeStyle = linearGradient;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo( source.x,  source.y );//右上角开始绘制
        ctx.lineTo( target.x,  target.y  );
        ctx.closePath();
        // ctx.fillStyle = node.style.backgroundColor;
        // ctx.fill();
        // console.log("看看是啥",ctx)
        ctx.stroke();
    },
    // 添加节点
    addNode(node) {
        // console.log("添加节点",node.shape,this.data.nodeShape)
        // let currentShape = 
        let reData ={};
        
        if (!this.data.nodeShape[node.shape]) {//判断是否注册节点
            reData = "没有节点"
            return reData
        }
        
        if (node.shape == 'nodeNormal') {//人工节点类型的节点
            node.style = this.data.nodeShape[node.shape];//获取对应节点类型的样式
            this.addnodeNormal(node);
        }

        this.cell.push(node);//记录画布中所有
        this.nodes.push(node);//记录画布中节点
        
        // console.log("符合条件的节点",this.cell)
        reData = "有节点"
        return reData
            
    },
    // 生成对角为圆角的矩形节点(人工节点)
    addnodeNormal(node) {
        // console.log("绘制人工节点")
        let ctx = this.data.myCanvasObj.getContext("2d");
        let nodeX = node.x;
        let nodeY = node.y;
        let width = node.style.width;
        let height = node.style.height;
        let borderColor = node.style.borderColor;
        let borderRadius = node.style.borderRadius;
        let borderColorLinearGradient = node.style.borderColorLinearGradient;
        // ctx.moveTo(0,0);
        // ctx.lineTo(400,300);
        let linearGradient = ctx.createLinearGradient(nodeX, nodeY-height/2, nodeX, nodeY+height/2);//线性渐变的起止坐标
        linearGradient.addColorStop(0, borderColorLinearGradient.start);//创建渐变的开始颜色，0表示偏移量，个人理解为直线上的相对位置，最大为1，一个渐变中可以写任意个渐变颜色
        linearGradient.addColorStop(1, borderColorLinearGradient.end);
        //设置线条颜色
        ctx.strokeStyle = linearGradient;
        ctx.lineWidth = 2;
        // if (node.style. borderColorLinearGradientFlag) {
        //     ctx.strokeStyle = linearGradient;
        // } else {
        //     ctx.strokeStyle = node.style.borderColor ? node.style.borderColor : this.myCanvasDefault.borderColor;
        // }
        ctx.beginPath();
        ctx.moveTo( nodeX + width/2,  nodeY - height/2 );//右上角开始绘制
        ctx.lineTo( nodeX + width/2,  nodeY + height/2 - borderRadius );
        //从右下角圆弧绘制
        ctx.arc( nodeX + width/2 -15,  nodeY + height/2 - borderRadius, borderRadius, 0, 0.5*Math.PI);
        //矩形下边线  
        ctx.lineTo( nodeX + width/2 - borderRadius, nodeY + height/2 );
        ctx.lineTo( nodeX - width/2, nodeY + height/2 );
        ctx.lineTo( nodeX - width/2, nodeY - height/2 + borderRadius );
        //从左上角圆弧绘制
        ctx.arc( nodeX - width/2 + 15,  nodeY - height/2 + borderRadius, borderRadius, 1*Math.PI, 1.5*Math.PI);
        ctx.lineTo( nodeX - width/2 + 15, nodeY - height/2 );
        ctx.lineTo( nodeX + width/2,  nodeY - height/2 );
        ctx.closePath();
        ctx.fillStyle = node.style.backgroundColor;
        ctx.fill();
        // console.log("看看是啥",ctx)
        ctx.stroke();
        ctx.fillStyle = node.style.fontColor;
        ctx.font="14px 'Microsoft YaHei'";
        ctx.textAlign = 'center'; 
        ctx.textBaseline="middle";
        // ctx.fillText(node.data.label, nodeX, nodeY, width);

        const textHeightR = this.fillTextWrap(
            ctx,
            node.data.label,
            nodeX,
            nodeY-8,//为了让文字垂直居中
            width - 20,
            height - 10,
            16
            )
        return ctx
    },
    // 文字换行
    fillTextWrap(ctx, text, x, y, maxWidth, maxHeight, lineHeight) {
        // 设定默认最大宽度
        // const systemInfo = wx.getSystemInfoSync()
        // const deciveWidth = systemInfo.screenWidth
        // 默认参数
        maxWidth = maxWidth || deciveWidth
        lineHeight = lineHeight || 20
        // 校验参数
        if (
        typeof text !== 'string' ||
        typeof x !== 'number' ||
        typeof y !== 'number'
        ) {
            return
        }
        // 字符串分割为数组
        const arrText = text.split('')
        // 当前字符串及宽度
        let currentText = ''
        let currentWidth
        for (let letter of arrText) {
            currentText += letter
            currentWidth = ctx.measureText(currentText).width
            if (currentWidth > maxWidth) {
                ctx.fillText(currentText, x, y)
                currentText = ''
                y += lineHeight
            }
        }
        if (currentText) {
            ctx.fillText(currentText, x, y)
        }
    },
    // 设置画布网格
    initGrid() {
        let grid = this.data.configData.grid ? this.data.configData.grid : {};
        grid.visible = grid.visible ? grid.visible : false;//是否启用网格-默认不启用
        grid.color = grid.color ? grid.color : "#e0e1e6";//网格颜色-默认黑色
        grid.size = grid.size ? grid.size : 10;//网格大小-默认10
        if (!grid.visible) { //是否开启网格
            return
        }
        // console.log("设置网格",this.data.myCanvasObj.getContext('2d'))
        // return
        if (this.data.myCanvasObj.getContext) {
            // return
            let ctx = this.data.myCanvasObj.getContext('2d');//获取画布绘制环境
            // ctx.clearRect(0, 0, this.data.myCanvasObj.width, this.data.myCanvasObj.height);//清空画布内像素
            // 判断x/y方向需要绘制多少个点
            let xPoitNum = this.data.myCanvasObj.width/grid.size;
            let yPoitNum = this.data.myCanvasObj.height/grid.size;
            // console.log("y方向需要绘制多少个点",xPoitNum,yPoitNum)
            for(let xx = 0; xx <= xPoitNum; xx++) {
                for(let yy = 0; yy <= yPoitNum; yy++) {
                    ctx.beginPath();
                    //context.arc(x,y,r,sAngle,eAngle,counterclockwise);
                    ctx.arc(xx*grid.size,yy*grid.size,0.5,0,2*Math.PI);
                    // ctx.lineWidth=1;
                    ctx.strokeStyle = grid.color;
                    ctx.stroke();
                    ctx.fillStyle = grid.color;
                    ctx.fill();
                }
            }

        }
    },
    // 设置画布样式
    initBackground() {
        let graphSty = this.data.configData.background ? this.data.configData.background : {};
        // console.log("33333333",graphSty)
        //设置颜色or默认画布颜色
        graphSty.color = graphSty.color ? graphSty.color : '#F8FAFF';
        this.data.myCanvasObj.style.backgroundColor = graphSty.color;
    },
    // 重置画布宽高
    resize(width,height) {
        console.log("触发重置匡高",this)

        let ctx = this.data.myCanvasObj.getContext('2d');
        let canvasData = ctx.getImageData(0, 0, this.data.myCanvasObj.width, this.data.myCanvasObj.height);  // 保存画布
        // this.data.myCanvasObj.width = this.data.container.offsetWidth; //设置宽高
        // this.data.myCanvasObj.height = this.data.container.offsetHeight; //设置宽高
        
        this.data.myCanvasObj.width = 2000; // 设置宽高
        this.data.myCanvasObj.height = 2000; // 设置宽高
        ctx.putImageData(canvasData, 0, 0);  //  改变完宽高后，重绘画布
        // this.initGrid();
    },
    // 设置画布事件
    initEvent() {
        let thisIn = this;
        // 点击事件
        this.data.myCanvasObj.addEventListener('click', function(event) {
            console.log("点击了~~",event,thisIn.data.container.style.paddingLeft)
            let ctx = thisIn.data.myCanvasObj.getContext('2d');
            // //     let canvas = canvas 
            let x = event.pageX - thisIn.data.container.getBoundingClientRect().left;
            let y = event.pageY - thisIn.data.container.getBoundingClientRect().top;
            // let canvasData = ctx.getImageData(0, 0, thisIn.data.myCanvasObj.width, thisIn.data.myCanvasObj.height);  // 保存画布
            // console.log("看看保存的画布是啥",canvasData)
            // console.log("就看看想说到说到",x,y,thisIn.cell)
            // 判断点击位置是否在节点上
            let currentNode = {}
            for (let node of thisIn.cell) {
                // console.log("看看点击事件",node)
                if (node.shape == 'nodeNormal') {//人工节点类型的节点
                    node.style = thisIn.data.nodeShape[node.shape];//获取对应节点类型的样式
                    if (thisIn.addnodeNormal(node).isPointInPath(x, y)) {
                        currentNode = node
                    }
                    // console.log("确实是当前这个true",thisIn.addnodeNormal(node).isPointInPath(x, y))
                }
            }
            console.log("点击的点解",currentNode)
       }, false)
    //    移入事件
    thisIn.data.myCanvasObj.addEventListener('mousedown', function(event) {
        return
            console.log("onmousedown")
            var startPosition =thisIn.window2Canvas(e.clientX,e.clientY);

                var startPositionX = startPosition.x -thisIn.oldPosition.x;
                var startPositionY = startPosition.y -thisIn.oldPosition.y;

                var thisIn =thisIn;
            thisIn.canvas.onmousemove = function(e){//鼠标移动的时候
                    var newPosition = thisIn.window2Canvas(e.clientX,e.clientY);
                    thisIn.oldPosition.x = newPosition.x - startPositionX;
                    thisIn.oldPosition.y = newPosition.y - startPositionY;
                    //判断绘制的图形是否超出canvas的边界
                    if(thisIn.oldPosition.x < 0) thisIn.oldPosition.x = 0;

                    if(thisIn.oldPosition.x + thisIn.area.w > thisIn.canvas.width) 
                        thisIn.oldPosition.x = thisIn.canvas.width - thisIn.area.w;

                    if(thisIn.oldPosition.y < 0 ) thisIn.oldPosition.y = 0;

                    if(thisIn.oldPosition.y + thisIn.area.h > thisIn.canvas.height) 
                        thisIn.oldPosition.y = thisIn.canvas.height - thisIn.area.h;
                    //边移动边在新的位置绘制图形
                    thisIn.drawing();
                }

            console.log("点击了~~",event,thisIn.data.container.style.paddingLeft)
            let ctx = thisIn.data.myCanvasObj.getContext('2d');
            // //     let canvas = canvas 
            let x = event.pageX - thisIn.data.container.getBoundingClientRect().left;
            let y = event.pageY - thisIn.data.container.getBoundingClientRect().top;
            // let canvasData = ctx.getImageData(0, 0, thisIn.data.myCanvasObj.width, thisIn.data.myCanvasObj.height);  // 保存画布
            // console.log("看看保存的画布是啥",canvasData)
            // console.log("就看看想说到说到",x,y,thisIn.cell)
            // 判断点击位置是否在节点上
            let currentNode = {}
            for (let node of thisIn.cell) {
                // console.log("看看点击事件",node)
                if (node.shape == 'nodeNormal') {//人工节点类型的节点
                    node.style = thisIn.data.nodeShape[node.shape];//获取对应节点类型的样式
                    if (thisIn.addnodeNormal(node).isPointInPath(x, y)) {
                        currentNode = node
                    }
                    // console.log("确实是当前这个true",thisIn.addnodeNormal(node).isPointInPath(x, y))
                }
            }
            console.log("点击的点解",currentNode)
       }, false)
    },
}

export default myCanvasEditor

// export default {
// 	getUUID() {
// 		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
// 			var r = Math.random() * 16 | 0,
// 				v = c == 'x' ? r : (r & 0x3 | 0x8);
// 			return v.toString(16);
// 		});
// 	}
// }