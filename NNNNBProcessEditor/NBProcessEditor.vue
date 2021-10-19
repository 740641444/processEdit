<template>
  <div class="NBProcessEditorBox" :ref="graphId" v-loading="graphLoading">

    <!-- 可拖拽工具栏 -->
    <toolbar :nodeInfo="nodeInfo" :NB_graph="NB_graph" @toolbarEvent="toolbarEvent"></toolbar>
    <!-- 画布 -->
    <div :id="graphId" class="NBProcessEditor_graph" style="width:100%;height:100%;"></div>
    <!-- <div id="container" ></div> -->
    <!-- 小地图 -->
    <!-- <div id="minimap" style="position:abslote"></div> -->
    <!-- 右键菜单 -->
    <transition name="el-fade-in">
      <rightClickMenu v-show="rightClickMenuData.isShow" :ref="rightClickMenuData.rightClickMenuId" :rightClickMenuData="rightClickMenuData" oncontextmenu="return false" @menuChange="clickMenuChange"></rightClickMenu>
    </transition>
    
<!-- <script src="https://unpkg.com/@antv/x6@1.1.1/dist/x6.js"></script> -->
<!-- <script src="https://unpkg.com/@antv/x6/dist/x6.js"></script> -->
  </div>
</template>
<script>  
// var X66 = require("./X66.js")
// import './fontClass/iconfont.css' // 字体图标
// import './fontClass/iconfont.js' // 字体图标

// import { Graph,Addon,Shape, EdgeView,Vector  } from "./X666.js";//Graph画布,Addon工具栏拖拽
import { Graph,Addon,Shape, EdgeView,Vector  } from "./antvX6.js";//Graph画布,Addon工具栏拖拽
// import { Graph,Addon,Shape, EdgeView,Vector  } from "@antv/x6";//Graph画布,Addon工具栏拖拽

import toolbar from "./toolbar/toolbar.vue";//可拖拽工具栏
import rightClickMenu from "./rightClickMenu/rightClickMenu.vue";//右键菜单

let jsonData = {
    "edges": [
        {
            "id": "3ce965da73b540d69d45be876019a55e",
            "index": 0,
            "source": "nodeBegin",
            "sourceAnchor": 0,
            "target": "node144205367460",
            "targetAnchor": 1
        },
        {
            "id": "56ee9caa20aa4fc8af64895044e564e8",
            "index": 0,
            "source": "node144205367460",
            "sourceAnchor": 0,
            "target": "node105467719240",
            "targetAnchor": 1
        },
        {
            "id": "1a8519c9196f446d901db7aba705888d",
            "index": 0,
            "source": "node144205367460",
            "sourceAnchor": 0,
            "target": "node1110439552739",
            "targetAnchor": 1
        },
        {
            "id": "52aeeff2ef73428687ac5a6d800193c4",
            "index": 0,
            "source": "node1420149133049",
            "sourceAnchor": 0,
            "target": "node144841588198",
            "targetAnchor": 1
        },
        {
            "id": "659631463f6b42a696b05066430e9f19",
            "index": 0,
            "source": "node1430531280346",
            "sourceAnchor": 0,
            "target": "node175189855049",
            "targetAnchor": 1
        },
        {
            "id": "2018a65f9e174cefae3a152d769c63a6",
            "index": 0,
            "source": "node1430531280346",
            "sourceAnchor": 0,
            "target": "node1546489945019",
            "targetAnchor": 1
        },
        {
            "id": "4a29c329c32f49ed9625815cad87ca18",
            "index": 0,
            "source": "node175189855049",
            "sourceAnchor": 0,
            "target": "node155614372977",
            "targetAnchor": 1
        },
        {
            "id": "d0ff7d096db142f9ba5a93de8ffa092e",
            "index": 0,
            "source": "node175189855049",
            "sourceAnchor": 0,
            "target": "node1752322556344",
            "targetAnchor": 1
        },
        {
            "id": "aaa61a8f9a8f4b4c971e4e6c02cc05d6",
            "index": 0,
            "source": "node1752322556344",
            "sourceAnchor": 0,
            "target": "node1753274395679",
            "targetAnchor": 1
        },
        {
            "id": "e853ab0b4dc24e43ae651ead94672562",
            "index": 0,
            "source": "node1753274395679",
            "sourceAnchor": 0,
            "target": "node175440154010",
            "targetAnchor": 1
        },
        {
            "id": "cc0f549c0abc43ed959f976f5962800a",
            "index": 0,
            "source": "node175440154010",
            "sourceAnchor": 0,
            "target": "node94073243431",
            "targetAnchor": 1
        },
        {
            "id": "9d6125afe57047038f0d431e2bf77e0b",
            "index": 0,
            "source": "node175440154010",
            "sourceAnchor": 0,
            "target": "node1635545151175",
            "targetAnchor": 1
        },
        {
            "id": "3f30660fc4164fbd83601bdbbf583cf2",
            "index": 0,
            "source": "node175440154010",
            "sourceAnchor": 0,
            "target": "node2019416053629",
            "targetAnchor": 1
        },
        {
            "id": "83ca6b36b8fc4fbeb25385ea0db4a012",
            "index": 0,
            "source": "node94073243431",
            "sourceAnchor": 0,
            "target": "node942199228538",
            "targetAnchor": 1
        },
        {
            "id": "a0a2f035f6b041ccb9a899b2393ed186",
            "index": 0,
            "source": "node94073243431",
            "sourceAnchor": 0,
            "target": "nodeEnd",
            "targetAnchor": 1
        },
        {
            "id": "4cdd8d2338f64b87bfc62c526c96f55b",
            "index": 0,
            "source": "node942199228538",
            "sourceAnchor": 0,
            "target": "nodeEnd",
            "targetAnchor": 1
        },
        {
            "id": "e487a46964fd48e78f74eaf793c68021",
            "index": 0,
            "source": "node105467719240",
            "sourceAnchor": 0,
            "target": "subnode1525343924023",
            "targetAnchor": 1
        },
        {
            "id": "5c0e898f86124881bae310769c34a252",
            "index": 0,
            "source": "node108459627176",
            "sourceAnchor": 0,
            "target": "node1011405337562",
            "targetAnchor": 1
        },
        {
            "id": "e4ebaeaebad148e58cb9f1f114433360",
            "index": 0,
            "source": "node1011405337562",
            "sourceAnchor": 0,
            "target": "node1012596278435",
            "targetAnchor": 1
        },
        {
            "id": "60022331b4514382a264641d091b90c2",
            "index": 0,
            "source": "node1012596278435",
            "sourceAnchor": 0,
            "target": "node101644999760",
            "targetAnchor": 1
        },
        {
            "id": "a1470fb1226a46039396928c4b54a329",
            "index": 0,
            "source": "node101644999760",
            "sourceAnchor": 0,
            "target": "node11412219839",
            "targetAnchor": 1
        },
        {
            "id": "4846bc07e73a429ab0a530390cafde05",
            "index": 0,
            "source": "node1110439552739",
            "sourceAnchor": 0,
            "target": "node1420149133049",
            "targetAnchor": 1
        },
        {
            "id": "e59dc433d4c946e78ee6fbbda774dfea",
            "index": 0,
            "source": "node1110439552739",
            "sourceAnchor": 0,
            "target": "node1416464934574",
            "targetAnchor": 1
        },
        {
            "id": "59710e9dd21e4ac1984edd56696a75a0",
            "index": 0,
            "source": "node1416464934574",
            "sourceAnchor": 0,
            "target": "node1416564579955",
            "targetAnchor": 1
        },
        {
            "id": "18907d27b402491db4c3f8be495c5225",
            "index": 0,
            "source": "node1416564579955",
            "sourceAnchor": 0,
            "target": "node1417184350751",
            "targetAnchor": 1
        },
        {
            "id": "e2a66c19e57843d180f9887db0ee7d7e",
            "index": 0,
            "source": "node1417184350751",
            "sourceAnchor": 0,
            "target": "node1417423867258",
            "targetAnchor": 1
        },
        {
            "id": "6f56c53bbd6b4eea9d92f06f30c24972",
            "index": 0,
            "source": "node14334224408",
            "sourceAnchor": 0,
            "target": "node1435121323041",
            "targetAnchor": 1
        },
        {
            "id": "e873a2c900db466f821d3401fd986eba",
            "index": 0,
            "source": "node1435121323041",
            "sourceAnchor": 0,
            "target": "node1435172281487",
            "targetAnchor": 1
        },
        {
            "id": "74e5cb1741704dc4b416e04dc4862ac7",
            "index": 0,
            "source": "node1435172281487",
            "sourceAnchor": 0,
            "target": "node1139378913177",
            "targetAnchor": 1
        },
        {
            "id": "3d3a3ef9d9914c13950a5d1f3be47112",
            "index": 0,
            "source": "node1438183074170",
            "sourceAnchor": 0,
            "target": "node14334224408",
            "targetAnchor": 1
        },
        {
            "id": "c27dc95fc3ad4363b8fc8e4610f27c54",
            "index": 0,
            "source": "node144841588198",
            "sourceAnchor": 0,
            "target": "node1438183074170",
            "targetAnchor": 1
        },
        {
            "id": "fbc937fcc34048f0822f67b3b9246e01",
            "index": 0,
            "source": "node1633216921668",
            "sourceAnchor": 0,
            "target": "nodeEnd",
            "targetAnchor": 1
        },
        {
            "id": "5c73fc91cad44e5eb5a536c3012885ab",
            "index": 0,
            "source": "node1635545151175",
            "sourceAnchor": 0,
            "target": "node165161694744",
            "targetAnchor": 1
        },
        {
            "id": "683c80fec44d4b42b745b9f052398aef",
            "index": 0,
            "source": "node1635545151175",
            "sourceAnchor": 0,
            "target": "node1652367284150",
            "targetAnchor": 1
        },
        {
            "id": "79d6f695e4c240c5945c627382bbcf71",
            "index": 0,
            "source": "node165161694744",
            "sourceAnchor": 0,
            "target": "node16549493179",
            "targetAnchor": 1
        },
        {
            "id": "98ef7f5c6e754036b380ca82d1f09baa",
            "index": 0,
            "source": "node1652367284150",
            "sourceAnchor": 0,
            "target": "node16549493179",
            "targetAnchor": 1
        },
        {
            "id": "e20257553e8148d2b3fe37ed3f71032b",
            "index": 0,
            "source": "node16549493179",
            "sourceAnchor": 0,
            "target": "nodeEnd",
            "targetAnchor": 1
        },
        {
            "id": "97c444b1ccf548c98af5b5ff08d46ad7",
            "index": 0,
            "source": "node2019416053629",
            "sourceAnchor": 0,
            "target": "node1633216921668",
            "targetAnchor": 1
        },
        {
            "id": "bbf9fca0bdfc4379a842a5a4ae97551f",
            "index": 0,
            "source": "node11412219839",
            "sourceAnchor": 0,
            "target": "node114144196249",
            "targetAnchor": 1
        },
        {
            "id": "eeebe10758e24708b503f78149c78a5a",
            "index": 0,
            "source": "node114144196249",
            "sourceAnchor": 0,
            "target": "node1111403975262",
            "targetAnchor": 1
        },
        {
            "id": "4621a9fa97ca4ac19cc29ef390522a28",
            "index": 0,
            "source": "node1111403975262",
            "sourceAnchor": 0,
            "target": "node1016412283567",
            "targetAnchor": 1
        },
        {
            "id": "335dad7c9fdd4fe1b6612234ad9298ee",
            "index": 0,
            "source": "node1139378913177",
            "sourceAnchor": 0,
            "target": "node1430531280346",
            "targetAnchor": 1
        }
    ],
    "nodes": [
        {
            "color": "",
            "id": "nodeBegin",
            "index": 1,
            "label": "开始",
            "nodetype": "nodeBegin",
            "size": "44*44",
            "type": "node",
            "x": 160,
            "y": 90
        },
        {
            "color": "",
            "id": "nodeEnd",
            "index": 1,
            "label": "结束",
            "nodetype": "nodeEnd",
            "size": "44*44",
            "type": "node",
            "x": 795,
            "y": 925
        },
        {
            "color": "",
            "id": "node144205367460",
            "index": 1,
            "label": "填写采购结果",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 285,
            "y": 94
        },
        {
            "color": "",
            "id": "node1420149133049",
            "index": 1,
            "label": "省公司物资部总经理审批",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 271,
            "y": 278
        },
        {
            "color": "",
            "id": "node1430531280346",
            "index": 1,
            "label": "公司分管领导审批",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 563,
            "y": 468
        },
        {
            "color": "",
            "id": "node175189855049",
            "index": 1,
            "label": "公司总经理审批",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 386,
            "y": 458
        },
        {
            "color": "",
            "id": "node1751401125169",
            "index": 1,
            "label": "省公司物资部总经理批办",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 37,
            "y": 525
        },
        {
            "color": "",
            "id": "node1752322556344",
            "index": 1,
            "label": "省公司物资部室经理办理",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 223,
            "y": 528
        },
        {
            "color": "",
            "id": "node1753274395679",
            "index": 1,
            "label": "采购员确认",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 463,
            "y": 726
        },
        {
            "color": "",
            "id": "node175440154010",
            "index": 1,
            "label": "合同起草任务确认",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 664,
            "y": 724
        },
        {
            "color": "",
            "id": "node94073243431",
            "index": 1,
            "label": "分公司采购员合同起草",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 399,
            "y": 894
        },
        {
            "color": "",
            "id": "node942199228538",
            "index": 1,
            "label": "分公司项目经理合同起草",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 464,
            "y": 1014
        },
        {
            "color": "",
            "id": "node105467719240",
            "index": 1,
            "label": "需求人废除归档",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 292,
            "y": 11
        },
        {
            "color": "",
            "id": "node108459627176",
            "index": 1,
            "label": "分公司协同采购员",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 682,
            "y": 27
        },
        {
            "color": "",
            "id": "node1011405337562",
            "index": 1,
            "label": "分公司部门副经理",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 813,
            "y": 23
        },
        {
            "color": "",
            "id": "node1012596278435",
            "index": 1,
            "label": "分公司部门总经理",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 969,
            "y": 26
        },
        {
            "color": "",
            "id": "node101644999760",
            "index": 1,
            "label": "分公司分管领导审批",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 1092,
            "y": 27
        },
        {
            "color": "",
            "id": "node1016412283567",
            "index": 1,
            "label": "分公司总经理审批",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 685,
            "y": 106
        },
        {
            "color": "",
            "id": "node119315458706",
            "index": 1,
            "label": "省公司物资部采购员办理",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 580,
            "y": 166
        },
        {
            "color": "",
            "id": "node1110439552739",
            "index": 1,
            "label": "省公司物资部室经理审批",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 288,
            "y": 167
        },
        {
            "color": "",
            "id": "node1416464934574",
            "index": 1,
            "label": "省公司会签部门总经理审批",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 411,
            "y": 283
        },
        {
            "color": "",
            "id": "node1416564579955",
            "index": 1,
            "label": "省公司会签部门副总经理审批",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 548,
            "y": 275
        },
        {
            "color": "",
            "id": "node1417184350751",
            "index": 1,
            "label": "省公司会签部门室经理阅处",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 682,
            "y": 278
        },
        {
            "color": "",
            "id": "node1417423867258",
            "index": 1,
            "label": "省公司会签部门相关人阅处",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 818,
            "y": 279
        },
        {
            "color": "",
            "id": "node14334224408",
            "index": 1,
            "label": "省公司会议秘书安排总经会决策",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 752,
            "y": 361
        },
        {
            "color": "",
            "id": "node1435121323041",
            "index": 1,
            "label": "省公司会议秘书填写总经会决策意见",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 924,
            "y": 364
        },
        {
            "color": "",
            "id": "node1435172281487",
            "index": 1,
            "label": "省公司物资部室经理阅处",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 929,
            "y": 463
        },
        {
            "color": "",
            "id": "node1438183074170",
            "index": 1,
            "label": "省公司会议秘书填写专题会议决策意见",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 602,
            "y": 359
        },
        {
            "color": "",
            "id": "node144841588198",
            "index": 1,
            "label": "省公司会议秘书安排专题会议决策",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 451,
            "y": 364
        },
        {
            "color": "",
            "id": "node1546489945019",
            "index": 1,
            "label": "省公司答疑分管领导",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 575,
            "y": 570
        },
        {
            "color": "",
            "id": "node155614372977",
            "index": 1,
            "label": "省公司答疑公司总经理",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 414,
            "y": 557
        },
        {
            "color": "",
            "id": "node1633216921668",
            "index": 1,
            "label": "省公司相关人合同起草",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 517,
            "y": 857
        },
        {
            "color": "",
            "id": "node1635545151175",
            "index": 1,
            "label": "协同采购员办理",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 821,
            "y": 643
        },
        {
            "color": "",
            "id": "node165161694744",
            "index": 1,
            "label": "合同起草",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 839,
            "y": 730
        },
        {
            "color": "",
            "id": "node1652367284150",
            "index": 1,
            "label": "合同起草分",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 979,
            "y": 642
        },
        {
            "color": "",
            "id": "node16549493179",
            "index": 1,
            "label": "合同分签汇总",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 908,
            "y": 894
        },
        {
            "color": "",
            "id": "subnode1525343924023",
            "index": 1,
            "label": "废除归档审批流程",
            "nodetype": "nodeSubFlow",
            "size": "95*45",
            "type": "node",
            "x": 451.5,
            "y": 6.5
        },
        {
            "color": "",
            "id": "node2019416053629",
            "index": 1,
            "label": "物资部支撑室室经理任务分配",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 662,
            "y": 851
        },
        {
            "color": "",
            "id": "node1122499986616",
            "index": 1,
            "label": "省公司物资部室经理审核",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 704,
            "y": 167
        },
        {
            "color": "",
            "id": "node11412219839",
            "index": 1,
            "label": "分公司会议秘书安排总经会决策",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 1089,
            "y": 96
        },
        {
            "color": "",
            "id": "node114144196249",
            "index": 1,
            "label": "分公司会议秘书填写总经会决策意见",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 972,
            "y": 99
        },
        {
            "color": "",
            "id": "node1111403975262",
            "index": 1,
            "label": "分公司分管领导确认",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 832,
            "y": 107
        },
        {
            "color": "",
            "id": "node1139378913177",
            "index": 1,
            "label": "省公司物资部总经理确认",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 736,
            "y": 468
        },
        {
            "color": "",
            "id": "node100239180921",
            "index": 1,
            "label": "省公司物资部副总经理审批",
            "nodetype": "nodeNormal",
            "size": "95*45",
            "type": "node",
            "x": 154,
            "y": 284
        },
        // {
        //     "color": "",
        //     "id": "node10023918092144",
        //     "index": 1,
        //     "label": "逻辑判断111",
        //     "nodetype": "nodeLogicJudge",
        //     "size": "95*45",
        //     "type": "node",
        //     "x": 100,
        //     "y": 100
        // },
        // {
        //     "color": "",
        //     "id": "node10023918092133",
        //     "index": 1,
        //     "label": "合并111",
        //     "nodetype": "nodeMerge",
        //     "size": "95*45",
        //     "type": "node",
        //     "x": 50,
        //     "y": 50
        // },
        // {
        //     "color": "",
        //     "id": "node10023918092122",
        //     "index": 1,
        //     "label": "路由1111",
        //     "nodetype": "nodeRouter",
        //     "size": "95*45",
        //     "type": "node",
        //     "x": 0,
        //     "y": 0
        // }
    ]
}



// import { DataUri } from '@antv/x6'
export default {
  name: "NBProcessEditor",
  // components: {rightClickMenu},
  components: {toolbar,rightClickMenu},
  props: {
    msg: String,
  },
  data() {
    return {
      graphLoading: false,
      rightClickMenuData: {//右键菜单对象
        rightClickMenuId: '',
        isShow: false,
      },
      // rightClickMenuFlag:false,//右键菜单开关
      graphId: '',
      NB_graph: {},//画布对象
      containerObj: {},
      nodeInfo: [],//节点信息-用于生成toolbar
      nodeType: {//节点类型
        nodeNormal: {
          nodeType: 'nodeNormal',
          nodeLabel: '人工活动',
          nodeIcon: 'GZL-人工.svg',
          isShowToolbar: true,
          nodeSty:{
              inherit: 'html',
              width: 120,
              height: 64,
              ports: this.getPorts(),
              html() {
                const wrap = document.createElement('div')
                wrap.style.width = '120px'
                wrap.style.height = '64px'
                // wrap.style.lineHeight = '84px'
                wrap.style.textAlign = 'center'
                wrap.style.display = 'flex'
                wrap.style.alignItems = 'center'
                wrap.style.justifyContent = 'center'
                wrap.style.wordBreak = 'break-word'
                wrap.style.boxSizing =  'border-box';
                wrap.style.textAlign = 'center'
                wrap.style.border = '2px solid #967CF8'
                wrap.style.borderRadius = '15px 0 15px 0'
                wrap.style.background = 'rgba(255,255,255,0.6)'
                wrap.style.padding = '0px'
                wrap.innerText = ''
                wrap.className = 'nodeDefaultSty'
                return wrap
              },
          }
        },
        nodeBegin: {
          nodeType: 'nodeBegin',
          nodeLabel: '开始',
          nodeIcon: 'GZL-人工.svg',
          isShowToolbar: false,
          nodeSty: {
            inherit: 'html',
            width: 60,
            height: 60,
            ports: this.getPorts(),
            html() {
              const wrap = document.createElement('div')
              wrap.style.width = '60px'
              wrap.style.height = '60px'
              // wrap.style.lineHeight = '84px'
              wrap.style.display = 'flex'
              wrap.style.alignItems = 'center'
              wrap.style.justifyContent = 'center'
              wrap.style.border = '2px solid #5A6BDF'
              wrap.style.borderRadius = '50%'
              wrap.style.background = 'rgba(255,255,255,0.6)'
              wrap.style.padding = '0px'
              wrap.innerText = ''
              wrap.className = 'nodeDefaultSty'
              return wrap
            },
          }
        },
        nodeEnd: {
          nodeType: 'nodeEnd',
          nodeLabel: '结束',
          nodeIcon: 'GZL-人工.svg',
          isShowToolbar: false,
          nodeSty: {
            inherit: 'html',
            width: 60,
            height: 60,
            ports: this.getPorts(),
            html() {
              const wrap = document.createElement('div')
              wrap.style.width = '60px'
              wrap.style.height = '60px'
              // wrap.style.lineHeight = '84px'
              wrap.style.display = 'flex'
              wrap.style.alignItems = 'center'
              wrap.style.justifyContent = 'center'
              wrap.style.border = '2px solid #5A6BDF'
              wrap.style.borderRadius = '50%'
              wrap.style.background = 'rgba(255,255,255,0.6)'
              wrap.style.padding = '0px'
              wrap.innerText = ''
              wrap.className = 'nodeDefaultSty'
              return wrap
            },
          }
        },
        nodeRouter: {
          nodeType: 'nodeRouter',
          nodeLabel: '路由',
          nodeIcon: 'GZL-路由.svg',
          isShowToolbar: true,
          nodeSty: {
            inherit: 'html',
            width: 120,
            height: 64,
            ports: this.getPorts(),
            html() {
              const wrap = document.createElement('div')
              wrap.style.width = '120px'
              wrap.style.height = '64px'
              // wrap.style.lineHeight = '84px'
              wrap.style.display = 'flex'
              wrap.style.alignItems = 'center'
              wrap.style.justifyContent = 'center'
              wrap.style.wordBreak = 'break-word'
              wrap.style.border = '2px solid #35B1FF'
              wrap.style.borderRadius = '8px'
              wrap.style.background = 'rgba(255,255,255,0.6)'
              wrap.style.padding = '0px'
              wrap.innerText = ''
              wrap.className = 'nodeDefaultSty'
              return wrap
            },
          }
        },
        nodeLogicJudge: {
          nodeType: 'nodeLogicJudge',
          nodeLabel: '逻辑判断',
          nodeIcon: 'GZL-判断.svg',
          isShowToolbar: true,
          nodeSty: {
            inherit: 'polygon',
            width: 120,
            height: 64,
            attrs: {
              body: {
                strokeWidth: 1,
                stroke: '#EB7549',
                fill: 'rgba(255, 255, 255, 0.6)',
              },
              text: {
                // fontSize: 12,
                // color: '#262626',
                textWrap: {
                  text: '使用 textWrap 实现文本换行',
                  width: -10, // 宽度减少 10px
                }
              },
              polygon: {
                refPoints: '0,10 10,0 20,10 10,20',
              },
            },
            ports: this.getPorts(),
  
          }
        },
        nodeMerge: {
          nodeType: 'nodeMerge',
          nodeLabel: '合并',
          nodeIcon: 'GZL-合并.svg',
          isShowToolbar: true,
          nodeSty: {
            inherit: 'polygon',
            width: 120,
            height: 64,
            attrs: {
              body: {
                strokeWidth: 1,
                stroke: '#3ED862',
                fill: 'rgba(255, 255, 255, 0.6)',
              },
              text: {
                // fontSize: 12,
                // color: '#262626',
                textWrap: {
                  text: '使用 textWrap 实现文本换行',
                  width: -10, // 宽度减少 10px
                }
              },
              polygon: {
                refPoints: '1,0 19,0 20,20 0,20',
              },
            },
            ports: this.getPorts(),
  
          }
        },
        nodeSubFlow: {
          nodeType: 'nodeSubFlow',
          nodeLabel: '子流程',
          nodeIcon: 'GZL-子图.svg',
          isShowToolbar: true,
          nodeSty: {
            inherit: 'html',
            width: 120,
            height: 64,
            ports: this.getPorts(),
            html() {
              const wrap = document.createElement('div')
              wrap.style.width = '120px'
              wrap.style.height = '64px'
              // wrap.style.lineHeight = '84px'
              wrap.style.textAlign = 'center'
              wrap.style.display = 'flex'
              wrap.style.alignItems = 'center'
              wrap.style.justifyContent = 'center'
              wrap.style.wordBreak = 'break-word'
              wrap.style.boxSizing =  'border-box';
              wrap.style.textAlign = 'center'
              wrap.style.border = '2px solid #FFDE00'
              wrap.style.borderRadius = '32px'
              wrap.style.background = 'rgba(255,255,255,0.6)'
              wrap.style.padding = '0px'
              wrap.innerText = ''
              wrap.className = 'nodeDefaultSty'
              return wrap
            },
          }
        },
      },
      loadingTime:{},
    }
  },
  created() {
    // return
    // 生成画布id
    this.getGraphId();
    // 生成节点信息
    this.initNodeInfo();
  },
  mounted() {

// console.log("看看结果",X66,X66.Graph)
// const graph = new X66.Graph({
//     container: document.getElementById('container'),
//     width: 800,
//     height: 600,
//   });
// console.log("看看结果",X66)
// console.log("Graph",graph)



    // return
    // console.log("hahahahahagegege",this.nodeType)
    // 生成画布ID
    this.initGrapy();
    // 注册节点
    this.initNodeFn();
    // 注册事件
    this.initOnFn();
    // 生成默认模板(只有开始结束)*****父组件控制
    // this.initTemplateData();
    // 导入数据*****父组件控制
    // this.initJsonData(jsonData);
  },
  methods: {
    // 导入数据*****父组件控制
    initJsonData(nodeData) {
      let that = this;
      // console.log("tojson1",this.NB_graph.parseJSON(nodeData))
      // return
      // console.log("导入json节点数据",this.nodeType['nodeNormal'],nodeData)
      this.graphLoadingCtrl(true);
      // 定时器用于开启异步操作
      setTimeout(function(){
        // this.graphLoading = true;
        nodeData.nodes.forEach(function(obj,index){
          let createdNode = {};
          if (that.nodeType[obj.nodetype].nodeSty.inherit == 'html') {
            createdNode = {
              id: obj.id,
              shape: obj.nodetype,
              // shape: 'nodeLogicJudge',
              x: obj.x * 1.2,
              y: obj.y * 1.2,
              data:obj,
              html: that.nodeType[obj.nodetype].nodeSty.html
            }
            // 设置显示内容
            let newHtml = createdNode.html();
            newHtml.innerText = obj.label;
            // createdNode.html = newHtml;
            createdNode.html = function () {
              return newHtml
            }
          } else {
            createdNode = {
              id: obj.id,
              shape: obj.nodetype,
              // shape: 'nodeLogicJudge',
              x: obj.x * 1.2,
              y: obj.y * 1.2,
              data:obj,
              attrs: {
                text: {
                  textWrap: {
                    text: obj.label
                  }
                }
              }
            }
          }
          // 添加节点
          obj.jiedian=that.NB_graph.addNode(createdNode)
        })
        // 添加边
        nodeData.edges.forEach(function(obj,index){
          obj.jidian = that.NB_graph.addEdge({
            id: obj.id,
                tools: ['vertices'],
            // shape: obj.nodetype,
            // label:112233,
            source: obj.source,
            target: obj.target,
            data:  obj,
            attrs: {
              line: {
                stroke: '#5A6BDF',
                strokeWidth: 2,
                targetMarker: {
                  name: 'block',
                  width: 12,
                  height: 8,
                },
              },
            },
            zIndex: 0,
            connector: {//跳线
              name: 'jumpover',
              // name: 'rounded',
              args: {
                radius: 8,
              },
            },
          })
        })
        that.graphLoadingCtrl(false);
        that.NB_graph.centerContent();//画布居中
        that.changePortsVisible(false)
        // loadingTime = null;
      },100)
    },
    // 生成默认模板(只有开始结束)*****父组件控制
    initTemplateData() {
       this.NB_graph.addNode({
        shape: 'nodeBegin',
        x: 0,
        y: 0,
        label: '开始'
      })
       this.NB_graph.addNode({
        shape: 'nodeEnd',
        x: 0,
        y: 600,
        label: '结束'
      })
      this.NB_graph.centerContent();//画布居中
      this.changePortsVisible(false)
    },
    // 生成节点信息
    initNodeInfo() {
      // console.log("看看节点信息",this.nodeType)
      // this.nodeInfo = this.nodeType
      this.nodeInfo = [];
      for (let item in this.nodeType) {
        // item.
        this.nodeInfo.push(this.nodeType[item])
      }
      // console.log("看看生成节点信息",this.nodeInfo,this.nodeInfo,this.nodeInfo[0].nodeSty)
    },
    // 生成画布ID/菜单id
    getGraphId() {
      // console.log("getuuuuuid",this.getUUID())
      this.graphId = "NBProcessEditor_container" + this.getUUID();
      this.rightClickMenuData.rightClickMenuId = "rightClickMenuId" + this.getUUID();
    },
    // 生成画布
    initGrapy() {
      let that = this;
      this.containerObj = document.getElementById(this.graphId);
      this.NB_graph = new Graph({
        container: this.containerObj,
        panning: {//是否可以拖动画布***与scroller不兼容
          enabled: false,
          // modifiers: 'shift',
        },
        snapline: true,//对齐线
        scroller: {//滚动条
          enabled: true,
          pannable: true,
          pageVisible: false,
          pageBreak: false,
        },
        mousewheel: {//滚轮缩放
          enabled: true,
          minScale: 0.5,
          maxScale: 3,
          modifiers: ['ctrl', 'meta'],
        },
        selecting: {
          enabled: true,
          rubberband: true, // 启用框选
          rubberNode: true,
          rubberEdge: true,
          showNodeSelectionBox:true,
          className: 'my-selecting',
          modifiers: ['alt' , 'ctrl' , 'meta' , 'shift']
        },
        // width: 1200,
        // height: 3000,
        background: {
          //背景
          color: "#F8FAFF", // 设置画布背景颜色
        },
        grid: {
          //网格
          size: 16, // 网格大小 10px
          visible: true, // 渲染网格背景
        },  
        connecting: {//配置信息
          allowBlank: false, //是否允许连接到画布空白位置的点
          allowMulti: false, //是否允许在相同的起始节点和终止之间创建多条边
          allowLoop: false, //是否允许创建循环连线，即边的起始节点和终止节点为同一节点
          allowNode: true, //是否允许边链接到节点（非节点上的链接桩
          highlight: true,  //拖动边时，是否高亮显示所有可用的连接桩或节点-配合highlighting
          allowPort: true, //是否允许边链接到链接桩
          allowEdge: false, //是否允许边链接到另一个边
          snap: {// 自动吸附
            radius: 20,//自动吸附距离
          },
          // createEdge: true
          // router: 'manhattan',
          // router: 'metro',
          // router: 'normal',
          router: 'manhattan',
          // anchor: 'center',
          // connectionPoint: 'anchor',
          connector: {//连接器
            name: 'jumpover',//跳线
            args: {
              radius: 8,
            },
          },
          createEdge() {
            return new Shape.Edge({
              tools: ['vertices','segments',],
              attrs: {
                line: {
                  stroke: '#5A6BDF',
                  strokeWidth: 2,
                  targetMarker: {
                    name: 'block',
                    width: 12,
                    height: 8,
                  },
                },
              },
              zIndex: 0,
            })
          },
          // validateConnection({ targetPort, }) {
          //   console.log("kakakaka",targetPort,)
          //   return targetPort,
          // },
        },
        highlighting: {
          // 当链接桩可以被链接时，在链接桩外围渲染一个 2px 宽的红色矩形框
          default: {
            name: 'stroke',
            args: {
              padding: 4,
              attrs: {
                'stroke-width': 2,
                stroke: 'red',
              }
            },
          },
          magnetAdsorbed: {
            name: 'stroke',
            args: {
              padding: 10,
              attrs: {
                'stroke-width': 10,
                stroke: 'pink',
              }
            },
          },
          nodeAvailable: {
            // name: 'stroke',
            // args: {
            //   className: 'available',
            // },
            args: {
              padding: 4,
              attrs: {
                stroke: 'blue',
                // fill: '#D06269',
                // 'stroke-width': 80,
                // stroke: 'red',
              }
            },
          },
        },
        interacting: {//定制交互行为
          boolean:true,
          nodeMovable: true,//节点是否可以被移动
          edgeMovable: true,//边是否可以被移动
          arrowheadMovable: true,//边的起始/终止箭头是否可以被移动
          vertexMovable: true,//边的路径是否可以移动
        },
        // resizing: true,
        // rotating: true,
        // selecting: true,//是否可选中
        keyboard: true,//键盘事件
        history: true,//撤销/重做
        clipboard: true,//剪切板
          
        // minimap: {
        //   enabled: true,
        //   container: document.getElementById('minimap')!,
        //   width: 198,
        //   height: 198,
        //   padding: 10,
        // },
      });

      console.log("NB_graph", this.NB_graph);

      // this.NB_graph.fromJSON(data);
      this.NB_graph.fromJSON({});
      this.NB_graph.centerContent();//画布居中
      window.onresize = function () {
        console.log("浏览器宽度改变")
        that.NB_graph.resize("100%","100%");//画布居中
	    }
      // this.NB_graph.zoom(-0.5);//缩放
      // graph.translate(150, 40);//平移
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
    // 注册节点
    initNodeFn() {
      console.log("注册节点112",Graph)
      this.nodeInfo.forEach(function(obj,index){
        Graph.registerNode(obj.nodeType,obj.nodeSty,true)
      })
      return
    },
    // 注册事件
    initOnFn() {
      let that = this;
      // 事件-链接桩的隐藏/显示
      this.NB_graph.on('node:mouseenter', () => {
        this.changePortsVisible(true)
      })
      this.NB_graph.on('node:mouseleave', () => {
        this.changePortsVisible(false)
      })
      // 事件-移入移出
      this.NB_graph.on('node:mouseenter', ({ node }) => {
        // console.log("看看衣服",node)
        // if (node.shape !== "nodeBegin" && node.shape !== "nodeEnd" ) {
        //   node.addTools([{
        //       name: 'button-remove',
        //       args: {
        //           x:'95%',
        //           y: '5',
        //       },
        //     },
        //     // {
        //     //   name: 'boundary',
        //     //   args: {
        //     //     padding: 5,
        //     //     attrs: {
        //     //       fill: '#7c68fc',
        //     //       stroke: '#333',
        //     //       'stroke-width': 1,
        //     //       'fill-opacity': 0.2,
        //     //     },
        //     //   },
        //     // },
        //   ])
        // }
      })
      this.NB_graph.on('node:mouseleave', ({ node }) => {
        // if (node.shape !== "nodeBegin" && node.shape !== "nodeEnd" ) {
        //   node.removeTools()
        // }
      })

    // node-右键
      this.NB_graph.on('node:contextmenu', ({ e, x, y, node, view,cell }) => {
        console.log("node-右键node-右键node-右键",node)
        // ***************************************菜单start
        // 设置右键菜单位置
        let graphObj = that.$refs[that.graphId].getBoundingClientRect();
        this.$refs[that.rightClickMenuData.rightClickMenuId].$el.style.top = e.clientY - graphObj.top + 'px';
        this.$refs[that.rightClickMenuData.rightClickMenuId].$el.style.left = e.clientX - graphObj.left + 'px';
        // 设置操作类型-过滤菜单选项
        let sendMenuData = {
          handType: "node:contextmenu",
          node: node,
          cell: cell
        }
        this.$refs[that.rightClickMenuData.rightClickMenuId].setMenuList(sendMenuData)
        // 显示菜单
        this.rightClickMenuData.isShow = true;
        // 禁止滚动功能(出现菜单禁用)
        this.NB_graph.lockScroller()
        // ***************************************菜单end
      })
      // 全局注册菜单消失事件
      document.addEventListener('mousedown', (e) => {
        that.closeRightMenu(e)
      })
      //注册动画事件-流程演示
      that.NB_graph.on('signal', (cell) => {
        if (cell.isEdge()) {
          const view = that.NB_graph.findViewByCell(cell);
          if (view) {
            const token = Vector.create('circle', { r: 6, fill: '#feb662' });//动画圆点样式
            const target = cell.getTargetCell();
            setTimeout(() => {
              view.sendToken(token.node, 1000, () => {//动画时间
                if (target) {
                  that.NB_graph.trigger('signal', target)
                }
              })
            }, 300)
          }
        } else {
          that.flash(cell)
          const edges = that.NB_graph.model.getConnectedEdges(cell, {
            outgoing: true,
          })
          edges.forEach((edge) => that.NB_graph.trigger('signal', edge))
        }
      })
    },
    // 关闭右键菜单
    closeRightMenu(e) {
      // let t = document.getElementsByClassName('rightClickMenu')[0] // 最外层元素
      if (!this.rightClickMenuData.isShow) {
        return
      }
      let t = this.$refs[this.rightClickMenuData.rightClickMenuId].$el;
      if (!e.path.includes(t)) {
          // console.log("触发")
            // ObjStatus.innerHTML = '事件触发情况：触发'
        this.rightClickMenuData.isShow = false;
      } else {
          // console.log("未触发")
            // ObjStatus.innerHTML = '事件触发情况：未触发'
      }
      // 启用滚动功能
      this.NB_graph.unlockScroller()
    },
    // 链接桩的隐藏/显示
    changePortsVisible(visible) {
      // return
        const ports = this.containerObj.querySelectorAll(
          '.x6-port-body',
        )
        for (let i = 0, len = ports.length; i < len; i = i + 1) {
          ports[i].style.visibility = visible ? 'visible' : 'hidden'
        }
    },
    // 流程演示-动画效果
    flash(cell) {
      let that = this;
      const cellView = that.NB_graph.findViewByCell(cell)
      if (cellView) {
        cellView.highlight()
        setTimeout(() => cellView.unhighlight(), 300)
      }
    },
    // 右键菜单-选择菜单项后执行
    clickMenuChange(e) {
      let that = this;
      console.log('右键菜单-选择菜单项后执行',e)
      // 过滤编辑器内部操作
      if (e.menuInfo.key == "del") {//菜单删除操作
        e.node.remove();
      } else if ( e.menuInfo.key == "progressWalk") {//流程演示功能
         if (e.cell.isEdge()) {
          const view = that.NB_graph.findViewByCell(e.cell)
          // const view = graph.findViewByCell(cell) as EdgeView
          if (view) {
            const token = Vector.create('circle', { r: 6, fill: '#feb662' })
            const target = e.cell.getTargetCell()
            setTimeout(() => {
              view.sendToken(token.node, 1000, () => {
                if (target) {
                  that.NB_graph.trigger('signal', target)
                }
              })
            }, 300)
          }
        } else {
          that.flash(e.cell)
          const edges = that.NB_graph.model.getConnectedEdges(e.cell, {
            outgoing: true,
          })
          edges.forEach((edge) => that.NB_graph.trigger('signal', edge))
        }
      } else {//非内部操作触发业务层事件
        this.$emit("triggerEvent",e)
      }
      this.rightClickMenuData.isShow = false;
    },
    // toolbar事件分解器
    toolbarEvent(e) {
      console.log("toolbar事件分解器",e)
      if (e.type == "importData") {//toobar导入json
        this.initJsonData(e.data);
      }
    },
    graphLoadingCtrl(flag) {
      this.graphLoading = flag;
    },
    // 获取UUID
    getUUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },

  },
};
</script>

<style lang="scss">

.NBProcessEditorBox {
  width: 100%;
  height: 100%;
  position: relative;
  // 右键菜单
  // .rightClickMenu {
  //   width:200px;
  //   height: 200px;
  //   // border: 1px solid red;
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  // }
  // 节点样式-start
  .nodeDefaultSty {
    word-break: break-all;
    white-space: normal;
  }
  
  // 节点样式-end


  // 画布
  .NBProcessEditor_graph {
    // background: #F8FAFF;
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