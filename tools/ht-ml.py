# -*- coding:UTF-8 -*-
# 只支持python3,本机python3目录 /Library/Frameworks/Python.framework/Versions/3.7/bin/python3

import os

tabStr = '''
<table>
    <tbody>
     <tr>
      <th> PolylineOptions </th>
      <th> 类型 </th>
      <th> 说明 </th>
     </tr>
     <tr>
      <td> <code>map</code> </td>
      <td> <code><a href="/api/javascript-api/reference/map" target="_self">Map</a></code> </td>
      <td> 要显示该polyline的地图对象 </td>
     </tr>
     <tr>
      <td> <code>zIndex</code> </td>
      <td> <code>Number</code> </td>
      <td> 折线覆盖物的叠加顺序。默认叠加顺序，先添加的线在底层，后添加的线在上层。通过该属性可调整叠加顺序，使级别较高的折线覆盖物在上层显示<br /> 默认zIndex：50 </td>
     </tr>
     <tr>
      <td> <code>bubble</code> </td>
      <td> <code>Boolean</code> </td>
      <td>是否将覆盖物的鼠标或touch等事件冒泡到地图上
       <div style="float:right">
        （自v1.3 新增）
       </div><br /> 默认值：false </td>
     </tr>
     <tr>
      <td> <code>cursor</code> </td>
      <td> <code>String</code> </td>
      <td> 指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，Opera不支持自定义cursor </td>
     </tr>
     <tr>
      <td> <code>geodesic</code> </td>
      <td> <code>Boolean</code> </td>
      <td>是否绘制成大地线，默认false<a href="https://lbs.amap.com/api/javascript-api/example/overlayers/draw-ground-line/">相关示例</a></td>
     </tr>
     <tr>
      <td> <code>isOutline</code> </td>
      <td> <code>Boolean</code> </td>
      <td> 线条是否带描边，默认false </td>
     </tr>
     <tr>
      <td> <code>borderWeight</code> </td>
      <td> <code>Number</code> </td>
      <td> 描边的宽度，默认为1 </td>
     </tr>
     <tr>
      <td> <code>outlineColor</code> </td>
      <td> <code>String</code> </td>
      <td> 线条描边颜色，此项仅在isOutline为true时有效，默认：#000000 </td>
     </tr>
     <tr>
      <td> <code>path</code> </td>
      <td> <code>Array</code> </td>
      <td> 折线的节点坐标数组 </td>
     </tr>
     <tr>
      <td> <code>strokeColor</code> </td>
      <td> <code>String</code> </td>
      <td> 线条颜色，使用16进制颜色代码赋值。默认值为#006600 </td>
     </tr>
     <tr>
      <td> <code>strokeOpacity</code> </td>
      <td> <code>Number</code> </td>
      <td> 线条透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9 </td>
     </tr>
     <tr>
      <td> <code>strokeWeight</code> </td>
      <td> <code>Number</code> </td>
      <td> 线条宽度，单位：像素 </td>
     </tr>
     <tr>
      <td> <code>strokeStyle</code> </td>
      <td> <code>String</code> </td>
      <td> 线样式，实线:solid，虚线:dashed </td>
     </tr>
     <tr>
      <td> <code>strokeDasharray</code> </td>
      <td> <code>Array</code> </td>
      <td> 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在ie9+浏览器有效 取值： <br /> 实线：[0,0,0] <br /> 虚线：[10,10] ，[10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线<br /> 点画线：[10,2,10]， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白 （如此反复）组成的虚线 </td>
     </tr>
     <tr>
      <td> <code>lineJoin</code> </td>
      <td> <code>String</code> </td>
      <td> 折线拐点的绘制样式，默认值为'miter'尖角，其他可选值：'round'圆角、'bevel'斜角 </td>
     </tr>
     <tr>
      <td> <code>lineCap</code> </td>
      <td> <code>String</code> </td>
      <td> 折线两端线帽的绘制样式，默认值为'butt'无头，其他可选值：'round'圆头、'square'方头 </td>
     </tr>
     <tr>
      <td> <code>draggable</code> </td>
      <td> <code>Boolean</code> </td>
      <td> 设置折线是否可拖拽移动，默认为false </td>
     </tr>
     <tr>
      <td> <code>extData</code> </td>
      <td> <code>Any</code> </td>
      <td> 用户自定义属性，支持JavaScript API任意数据类型，如Polyline的id等 </td>
     </tr>
     <tr>
      <td> <code>showDir</code> </td>
      <td> <code>Boolean</code> </td>
      <td> 是否延路径显示白色方向箭头,默认false。Canvas绘制时有效，建议折线宽度大于6时使用；在3D视图下不支持显示方向箭头（自V1.4.0版本参数效果变更） </td>
     </tr>
    </tbody>
</table>
'''

#
# | Tables        | Are           | Cool  |
# | ------------- |:-------------:| -----:|
# | col 3 is      | right-aligned | $1600 |
# | col 2 is      | centered      |   $12 |
# | zebra stripes | are neat      |    $1 |

divStr = ":-------------:"
maxTdSpace = len(divStr)

#tdStr:td的内容,并且判断中文的个数,因为一个中文和一个字符的len是相同的
def getTdRemainSpaceCount(tdStr):
    charCount = len(tdStr)
    hanziCharCount = 0
    for index in range(0,charCount):
        #如果是汉字
        if( u'\u4e00' <= tdStr[index] <=u'\u9fff'):
            hanziCharCount+=1
    return maxTdSpace - len(tdStr) - hanziCharCount

def getSpaceStr(spaceCount):
    spaceStr = ""
    for i in range(0,spaceCount):
        spaceStr += " "
    return spaceStr

# 打印一行(一个 <tr>)   targetPreSplitStr 可能为 <td style="text-align: center">, targetBackSplitStr是 </th> 或 </td>
def printTabRow(str,targetPreSplitStr,targetBackSplitStr):
    rawCount = str.count(targetBackSplitStr,0,len(str))
    splitStr = str
    for index in range(0,rawCount):
        # print("for 循环 splitStr=" + splitStr)
        backIndex = splitStr.find(targetBackSplitStr)
        preStr = splitStr[0:backIndex]
        targetPreIndex = preStr.find(targetPreSplitStr)
        splitedStr = preStr[targetPreIndex:backIndex]
        preIndex = splitedStr.find(">") + 1
        targetStr = splitedStr[preIndex:backIndex]
        if index == 0:
            print("|",end='')

        remainPreSpaceCount = 0
        remainBackSpaceCount = 0
        tempRemainSpaceCount = getTdRemainSpaceCount(targetStr)
        if tempRemainSpaceCount %2 == 0:
            remainPreSpaceCount  = int(tempRemainSpaceCount/2)
            remainBackSpaceCount = remainPreSpaceCount
        else:
            remainPreSpaceCount =  int(tempRemainSpaceCount/2)
            remainBackSpaceCount = remainPreSpaceCount + 1

        preSpaceStr = getSpaceStr(remainPreSpaceCount)
        backSpaceStr = getSpaceStr(remainBackSpaceCount)

        #将 strong 标签替换掉
        targetStr = targetStr.replace("<strong>","**")
        targetStr = targetStr.replace("</strong>","**")
        print( preSpaceStr + targetStr + backSpaceStr + "|",end='')
        splitStr = splitStr[backIndex+len(targetBackSplitStr):len(str)]

        # print("for 循环，截取 splitStr=" + splitStr)
    print("") #如果要是 print("\n")反而会换两行

#divCount 是格数
def printTabDivision(divCount):
    for index in range(0,divCount):
        if index == 0:
            print("|",end='')
        print(divStr +"|",end='')
    print("")

#解析 thead
tHeadPreIndex = tabStr.find('<thead>') + len('<thead>')
tHeadBackIndex = tabStr.find('</thead>')
tHeadStr = tabStr[tHeadPreIndex:tHeadBackIndex]

# print("tHeadStr=" + tHeadStr)
printTabRow(tHeadStr,"<th","</th>")
divCount = tHeadStr.count("</th>",0,len(tHeadStr))
printTabDivision(divCount)

#解析 tbody
tbodyPreIndex = tabStr.find('<tbody>') + len('<tbody>')
tbodyBackIndex = tabStr.find('</tbody>')
tbodyStr = tabStr[tbodyPreIndex:tbodyBackIndex]
trCount = tbodyStr.count("</tr>",0,len(tbodyStr))

tempTbodyStr = tbodyStr
for index in range(0,trCount):
    lastTrIndex = tempTbodyStr.find("</tr>") + len("</tr>")
    preTrIndex = tempTbodyStr.find("<tr>")
    targetTrStr = tempTbodyStr[preTrIndex:lastTrIndex]
    printTabRow(targetTrStr,"<td","</td>")
    tempTbodyStr = tempTbodyStr[lastTrIndex:len(tempTbodyStr)]

os.system("pause")