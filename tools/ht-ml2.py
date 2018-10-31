# -*- coding:UTF-8 -*-
# 只支持python3,本机python3目录 /Library/Frameworks/Python.framework/Versions/3.7/bin/python3

import os

tabStr = '''
<table class="md-table  reference-table" data-meta="%7B%22class%22%3A%22reference-table%22%2C%22width%22%3A%22100%25%22%7D">
   <tbody>
    <tr>
     <th><p>GeolocationOptions</p></th>
     <th><p>类型</p></th>
     <th><p>说明</p></th>
    </tr>
    <tr>
     <td style="white-space: nowrap;"><p><code class="inline-code">enableHighAccuracy</code></p></td>
     <td><p><code class="inline-code">Boolean</code></p></td>
     <td><p>是否使用高精度</p><p>默认值：true</p></td>
    </tr>
    <tr>
     <td style="white-space: nowrap;"><p><code class="inline-code">timeout</code></p></td>
     <td><p><code class="inline-code">Number</code></p></td>
     <td><p>超时毫秒数，若在指定时间内未定位成功，返回超时错误信息“TIMEOUT”</p><p>默认值：无穷大</p></td>
    </tr>
    <tr>
     <td style="white-space: nowrap;"><p><code class="inline-code">noIpLocate</code></p></td>
     <td><p><code class="inline-code">Number</code></p></td>
     <td><p>是否禁止使用IP定位，默认值为0，可选值0-3</p><p>0: 可以使用IP定位</p><p>1: 手机设备禁止使用IP定位</p><p>2: PC上禁止使用IP定位</p><p>3: 所有终端禁止使用IP定位</p></td>
    </tr>
    <tr>
     <td style="white-space: nowrap;"><p><code class="inline-code">noGeoLocation</code></p></td>
     <td><p><code class="inline-code">Number</code></p></td>
     <td><p>是否禁止使用浏览器Geolocation定位，默认值为0，可选值0-3</p><p>0: 可以使用浏览器定位</p><p>1: 手机设备禁止使用浏览器定位</p><p>2: PC上禁止使用浏览器定位</p><p>3: 所有终端禁止使用浏览器定位</p></td>
    </tr>
    <tr>
     <td style="white-space: nowrap;"><p><code class="inline-code">GeoLocationFirst</code></p></td>
     <td><p><code class="inline-code">Boolean</code></p></td>
     <td><p>默认为false，设置为true的时候可以调整PC端为优先使用浏览器定位，失败后使用IP定位</p></td>
    </tr>
    <tr>
     <td style="white-space: nowrap;"><p><code class="inline-code">maximumAge</code></p></td>
     <td><p><code class="inline-code">Number</code></p></td>
     <td><p>缓存毫秒数。定位成功后，定位结果的保留时间</p><p>默认值：0</p></td>
    </tr>
    <tr>
     <td style="white-space: nowrap;"><p><code class="inline-code">convert</code></p></td>
     <td><p><code class="inline-code">Boolean</code></p></td>
     <td><p>是否使用坐标偏移，取值true:为高德地图坐标，取值false:为浏览器定位坐标</p><p>默认值：true</p></td>
    </tr>
    <tr>
     <td style="white-space: nowrap;"><p><code class="inline-code">showButton</code></p></td>
     <td><p><code class="inline-code">Boolean</code></p></td>
     <td><p>是否显示定位按钮</p><p>默认值：true</p></td>
    </tr>
    <tr>
     <td style="white-space: nowrap;"><p><code class="inline-code">buttonDom</code></p></td>
     <td><p><code class="inline-code">String|DomElement</code></p></td>
     <td><p>自定义定位按钮的内容。可支持HTML代码或Dom元素对象，不设置该属性则使用默认按钮样式</p></td>
    </tr>
    <tr>
     <td style="white-space: nowrap;"><p><code class="inline-code">buttonPosition</code></p></td>
     <td><p><code class="inline-code">String</code></p></td>
     <td><p>定位按钮可停靠的位置</p><p>“LT”：左上角</p><p>“LB”：左下角</p><p>“RT”：右上角</p><p>“RB”：右下角</p><p>默认值：“LB”</p></td>
    </tr>
    <tr>
     <td style="white-space: nowrap;"><p><code class="inline-code">buttonOffset</code></p></td>
     <td><p><a href="https://lbs.amap.com/api/javascript-api/reference/core/#Pixel" class="" target=""><code class="inline-code">Pixel</code></a></p></td>
     <td><p>按钮距离停靠位置的偏移量</p><p>默认值：Pixel(10,20)</p></td>
    </tr>
    <tr>
     <td style="white-space: nowrap;"><p><code class="inline-code">showMarker</code></p></td>
     <td><p><code class="inline-code">Boolean</code></p></td>
     <td><p>定位成功时是否在定位位置显示一个Marker</p><p>默认值：true</p></td>
    </tr>
    <tr>
     <td style="white-space: nowrap;"><p><code class="inline-code">markerOptions</code></p></td>
     <td><p><a href="/api/javascript-api/reference/overlay/#MarkerOptions" class="" target=""><code class="inline-code">MarkerOptions</code></a></p></td>
     <td><p>定位点Marker的配置，不设置该属性则使用默认Marker样式</p></td>
    </tr>
    <tr>
     <td style="white-space: nowrap;"><p><code class="inline-code">showCircle</code></p></td>
     <td><p><code class="inline-code">Boolean</code></p></td>
     <td><p>定位成功并且有精度信息时，是否用一个圆圈circle表示精度范围</p><p>默认值：true</p></td>
    </tr>
    <tr>
     <td style="white-space: nowrap;"><p><code class="inline-code">circleOptions</code></p></td>
     <td><p><a href="/api/javascript-api/reference/overlay#CircleOptions" class="" target=""><code class="inline-code">CircleOptions</code></a></p></td>
     <td><p>定位点Circle的配置，不设置该属性则使用默认Circle样式</p></td>
    </tr>
    <tr>
     <td style="white-space: nowrap;"><p><code class="inline-code">panToLocation</code></p></td>
     <td><p><code class="inline-code">Boolean</code></p></td>
     <td><p>定位成功后，是否把定位得到的坐标设置为地图中心点坐标</p><p>默认值：true</p></td>
    </tr>
    <tr>
     <td style="white-space: nowrap;"><p><code class="inline-code">zoomToAccuracy</code></p></td>
     <td><p><code class="inline-code">Boolean</code></p></td>
     <td><p>定位成功且显示精度范围时，是否把地图视野调整到正好显示精度范围</p><p>默认值：false</p></td>
    </tr>
    <tr>
     <td style="white-space: nowrap;"><p><code class="inline-code">useNative</code></p></td>
     <td><p><code class="inline-code">Boolean</code></p></td>
     <td><p>是否使用安卓定位sdk用来进行定位，默认：false</p><p>适用于同时在APP中使用安卓定位sdk并在APP WebView中使用了JSAPI的开发者。开启后，将优先尝试使用sdk进行定位，失败后依次尝试浏览器定位和IP定位。</p><p>注：如果要使用辅助定位的功能，除了需要将useNative属性设置为true以外，还需要调用高德定位sdk中，AMapLocationClient类的startAssistantLocation方法，开启辅助H5定位功能；如果不用，就调用stopAssistantLocation()方法停止辅助H5定位功能。具体用法可参考定位SDK的<a href="https://lbs.amap.com/api/android-location-sdk/reference/" class="" target="">参考手册</a></p></td>
    </tr>
    <tr>
     <td style="white-space: nowrap;"><p><code class="inline-code">extensions</code></p></td>
     <td><p><code class="inline-code">String</code></p></td>
     <td><p>JSAPI在定位成功的时候会将得到的经纬度进行逆地理编码后获取地址信息，以方便开发者的进一步使用;</p><p>extensions用来设定是否需要周边POI、道路交叉口等信息，可选值'base'、'all'。</p><p>默认为'base',只返回地址信息；</p><p>设定为'all'的时候将返回周边POI、道路交叉口等信息。</p></td>
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
            print("|",end = '')

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