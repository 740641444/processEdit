<template>
  <div class="toolbarBoxScope">
    <!-- 工具栏 -->
    <div class="toolBarBox" oncontextmenu = "return false">
      <div class="toolBar_title toolBarBottomLine" @mousedown="toolBarDragMove">工具条</div>
      <!-- 节点 -->
      <div class="toolBar_nodeBox toolBarBottomLine">
        <div class="toolBar_node_item" v-for="(item,index) in toolBarObj.nodeList" :key="index" v-show="item.isShowToolbar" >
          <!-- <span class="iconfont" :class="item.icon" :title="item.title" @mousedown="createdNode(item.title,$event)"></span> -->
          <div class="svgBox" :title="item.nodeLabel" @mousedown="createdNode(item,$event)">
            <img :src="require('../../svg/' + item.nodeIcon)" draggable="false">
            <!-- <svg class="svgSty" aria-hidden="true" @mousedown="createdNode(item,$event)">
                <use :xlink:href="item.nodeIcon"></use>
            </svg> -->
          </div>
        </div>
      </div>
      <!-- 操作 -->
      <div class="toolBar_nodeBox">
        <div class="toolBar_node_item" v-for="(item,index) in toolBarObj.handleList" :key="index">
          <div class="svgBox" :title="item.label" @click="handFn(item)">
            <span class="iconfont" :class="item.icon"></span>
            <!-- <img :src="require('../../svg/' + item.svgicon)"> -->
          </div>
          <!-- <span class="" :class="item.icon" :title="item.title" style="color:red" @click="xiazai">11</span> -->
        </div>
        <input v-show="false" ref="fileInput" type="file"  @change="onFileChange">
      </div>
    </div>
  </div>
</template>

<script>


// import { DataUri } from '@antv/x6'
// import { Graph,Addon  } from "@antv/x6";//Graph画布,Addon工具栏拖拽
// import { Graph,Addon,Shape, EdgeView,Vector,DataUri  } from "../antvX6.js";//Graph画布,Addon工具栏拖拽
export default {
    props: ['nodeInfo','NB_graph'],
    data() {
        return {
            positionX:0,//拖拽记录属性
            positionY:0,//拖拽记录属性
            toolBarObj: {
                handleList: [//操作
                  {
                      key: "saveData",
                      label: "保存",
                      icon: "icon-GZL-baocun",
                  },{
                      key: "importData",
                      label: "导入JSON",
                      icon: "icon-GZL-bangzhu",
                  },{
                      key: "exportData",
                      label: "导出JSON",
                      icon: "icon-GZL-bangzhu",
                  }
                    // {
                    //     key: "importData",
                    //     label: "导入",
                    //     icon: "icon-GZL-bangzhu",
                    //     svgicon: "GZL-导入.svg"
                    // },{
                    //     key: "exportData",
                    //     label: "导出JSON",
                    //     icon: "icon-GZL-bangzhu",
                    //     svgicon: "GZL-保存.svg"
                    // },{
                    //     key: "exportJson",
                    //     label: "导出SVG",
                    //     icon: "icon-GZL-bangzhu",
                    //     svgicon: "GZL-打印.svg"
                    // }
                ],
                nodeList: [//节点
                    {
                        id: 1,
                        title: "节点类型111",
                        icon: "#icon-luyou"
                    }
                ]
            },
        }
    },
    created() {
        // console.log("看看数据",this.nodeInfo,this.NB_graph)
        // 初始化数据
        this.initData();
    },
    methods: {
      // 初始化数据
      initData() {
          // this.mynodeInfo = this.nodeInfo;
          this.toolBarObj.nodeList = this.nodeInfo;
          // this.mynodeInfo = this.nodeInfo;
      },
      // 工具栏拖拽
      toolBarDragMove(e) {
          let currentNode = e.target.parentNode;//获取目标元素
          //算出鼠标相对元素的位置
          let disX = e.clientX - currentNode.offsetLeft;
          let disY = e.clientY - currentNode.offsetTop;
          document.onmousemove = (e)=>{       //鼠标按下并移动的事件
              //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
              let left = e.clientX - disX;    
              let top = e.clientY - disY;
              
              //绑定元素位置到positionX和positionY上面
              this.positionX = top;
              this.positionY = left;
              
              //移动当前元素
              if (left > currentNode.parentNode.clientWidth - currentNode.clientWidth) {//右侧边界
              left = currentNode.parentNode.clientWidth - currentNode.clientWidth;
              } else if (left < 0) {//左侧边界
              left = 0;
              } else {
              left = left;
              }
              if (top > currentNode.parentNode.clientHeight - currentNode.clientHeight) {//底部边界
              top = currentNode.parentNode.clientHeight - currentNode.clientHeight;
              } else if (top < 0) {//上边边界
              top = 0;
              } else {
              top = top;
              }
              currentNode.style.left = left + 'px';
              currentNode.style.top = top + 'px';
          };
          document.onmouseup = (e) => {
              document.onmousemove = null;
              document.onmouseup = null;
          };
      },
      // 工具栏-节点-拖拽生成节点
      createdNode(item,e) {
        // console.log("工具栏-节点-拖拽生成节点",this.NB_graph,item.nodeLabel,e)
        this.NB_graph.toolbarAddNode(item,e)
        return
        let node = this.NB_graph.createNode({
            shape: item.nodeType,
            label: item.nodeLabel,
        })
        // console.log("aaab",node,this.NB_graph)
        let dnd = new Addon.Dnd({target:this.NB_graph})
        dnd.start(node,e)
      },
      // 获取链接桩
      getPorts() {
        return {
            groups: {
            // 输入链接桩群组定义
            top: {
                position: 'top',
                attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#4381E6',
                    strokeWidth: 1,
                    fill: '#ffffff',
                },
                },
            },
            // 输入链接桩群组定义
            bottom: {
                position: 'bottom',
                attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#4381E6',
                    strokeWidth: 1,
                    fill: '#ffffff',
                },
                },
            },
            // 输入链接桩群组定义
            left: {
                position: 'left',
                attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#4381E6',
                    strokeWidth: 1,
                    fill: '#ffffff',
                },
                },
            },
            // 输入链接桩群组定义
            right: {
                position: 'right',
                attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#4381E6',
                    strokeWidth: 1,
                    fill: '#ffffff',
                },
                },
            }
            },
            items: [
            {
                // id: 'port1',
                group: 'top',
            },
            {
                // id: 'port2',
                group: 'bottom',
            },
            {
                // id: 'port3',
                group: 'left',
            },
            {
                // id: 'port4',
                group: 'right',
            }
            ],
        }
      },
      // 操作功能
      handFn(item) {
        console.log("进行操作",item)
        if (item.key == "exportJson") {//导出PNG
          this.handToPng();
        } else if (item.key == "exportData") {//导出json
          this.handToJson();
        } else if (item.key == "importData") {//导入json
          this.$refs.fileInput.click()
        } else if (item.key == "saveData") {//保存流程数据
        
            let getJsonData = this.NB_graph.toJSON();
            let jsonData = this.getGrapyJsonData(getJsonData)
            let sendData = {
              type: 'saveData',
              data: jsonData
            }
          this.$emit("toolbarEvent",sendData)
          // this.$refs.fileInput.click()
        }
      },
      // 上传json
      onFileChange(e) {
        let that = this;
        const file = e.target.files[0]
        // console.log("看看文件信息",file)
        if (file.type.indexOf('json') == -1) {
          this.$message.error('请选择json文件！');
          return
        }
        var reader=new FileReader();
        reader.readAsText(file,"utf8");//gbk编码
        reader.onload=function () {
          try {
            let jsonData =JSON.parse(this.result);
            // console.log(11,JSON.parse(this.result));// 文本内容
            if (!jsonData.nodes) {
              that.$message.error('json没有nodes信息！');
              return
            }
            if (!jsonData.edges) {
              that.$message.error('json没有edges信息！');
              return
            }
            let sendData = {
              type: 'importData',
              data: jsonData
            }
            that.$emit("toolbarEvent",sendData)
            that.$refs.fileInput.value = null;
            // 导入json数据
            // that.NB_graph.initJsonData(sendData)
          } catch (err){
            that.$message.error('json文件错误！');
            console.log("导入json文件错误",err)
            that.$refs.fileInput.value = null;
          }
        };
      },
      // 导出为json
      handToJson() {
        let getJsonData = this.NB_graph.toJSON();
        let jsonData = this.getGrapyJsonData(getJsonData)
        // jsonData = getJsonData
        // console.log("tojson",jsonData)

        if(!jsonData) {
          that.$message.error('json数据为空！');
          return;
        }
        let filename = '流程图.json'
        if(typeof jsonData === 'object'){
          jsonData = JSON.stringify(jsonData, undefined, 4)
        }
        var blob = new Blob([jsonData], {type: 'text/json'}),
        e = document.createEvent('MouseEvents'),
        a = document.createElement('a')
        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
// console.log("执行玩了")
      },
      // 获取需要的json数据
      getGrapyJsonData(getJsonData) {
        // return getJsonData
        let jsonData = {
          nodes: [],
          edges: [],
        };
        getJsonData.cells.forEach(function(obj,index){
          // console.log("看看导出的数据",obj)
          if (obj.shape == "edge") {//边
            jsonData.edges.push({
              id: obj.id,
              source: obj.source,
              target: obj.target,
            })
          } else {//节点
            jsonData.nodes.push({
              id: obj.id,
              // label: obj.html().innerText,
              label: obj.data.label,
              nodetype: obj.shape,
              size: obj.data.size,
              // type: obj.shape,
              x: obj.x,
              y: obj.y
            })
          }
        })
        return jsonData

      },
      // 导出PNG
      handToPng() {
        this.NB_graph.toPNG((dataUri) => {
          // 下载
          DataUri.downloadDataUri(dataUri, '流程图.png')
          // this.NB_graph.toJSON()
        }, {
          padding: {
            top: 20,
            right: 30,
            bottom: 40,
            left: 50,
          },
          // quality: 0.1
        })
      }
    },
}
</script>

<style lang="scss">

.toolbarBoxScope {
    width: 100%;
    height: 100%;
    position: absolute;
  // 工具栏
  .toolBarBox {
    width: 100px;
    height: 511px;
    background: #FFFFFF;
    border: 1px solid #D9DFE3;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.08);
    opacity: 1;
    border-radius: 4px;
    z-index: 9;
    position: absolute;
    top: 0;
    left: 0;
    // transition: all 0.1s ease-out;
    // 工具栏节点部分
    .toolBar_nodeBox {
      padding: 10px 17px;
      overflow: hidden;
      .toolBar_node_item {
        float: left;
        // width: 50%;
        width: 32px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        cursor: pointer;
        .iconfont {
          font-size: 16px;
        }
        // svg
        .svgBox {
          img {
            width: 16px;
            height: 16px;
          }
        }
        .svgBox,.svgSty {
            .svgSty {
                width: 16px;
                height: 16px;

            }
        }
      }
    }
    // 工具栏标题
    .toolBar_title {
      height: 46px;
      line-height: 46px;
      text-align: center;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #303133;
      cursor: move;
    }
    .toolBarBottomLine {
      border-bottom: 1px solid #D9DFE3;
    }
  }
  
  // 取消选中
  & {
    -webkit-user-select: none; 
    -moz-user-select: none;    
    -khtml-user-select: none;  
    -ms-user-select: none;    
    /* 以下两个属性目前并未支持，写在这里为了减少风险 */
    -o-user-select: none;
    user-select: none;
  }

}


</style>