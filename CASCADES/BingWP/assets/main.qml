/*
 * Copyright (c) 2011-2014 BlackBerry Limited.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import bb.cascades 1.0
import bb.platform 1.0
import "ajax.js" as AJAX
import "settings.js" as SET

NavigationPane {
    property string baseurl: "http://www.bing.com/HPImageArchive.aspx?format=js&idx=18&n=21&mkt="
    property string mkt: "zh-CN"
    id: nav
    Page {
        titleBar: TitleBar {
            title: qsTr("Bing Wallpapers")
        }
        actions: [
            ActionItem {
                title: qsTr("Wide view")
                onTriggered: {
                    var s = scrollStateHandler.firstVisibleItem;
                    var data = gdm.data(s).url;
                    console.log(data);
                    var i = itemPageDefinition.createObject();
                    i.u = data;
                    nav.push(i);
                }
                ActionBar.placement: ActionBarPlacement.OnBar
            },
            ActionItem {
                title: qsTr("Set Wallpaper")
                onTriggered: {
                    var s = scrollStateHandler.firstVisibleItem;
                    var data = gdm.data(s).url.replace("1366x768", SET.size);
                    console.log(data);
                    homescreen.setWallpaper(data);
                }
                ActionBar.placement: ActionBarPlacement.Signature
            },
            ActionItem {
                title: qsTr("Full view")
                onTriggered: {
                    var s = scrollStateHandler.firstVisibleItem;
                    var data = gdm.data(s).url.replace("1366x768", "1920x1200");
                    console.log(data);
                    var i = itemPageDefinition.createObject();
                    i.u = data;
                    nav.push(i);
                }
                ActionBar.placement: ActionBarPlacement.OnBar
            }
        ]
        actionBarVisibility: ChromeVisibility.Visible
        actionBarAutoHideBehavior: ActionBarAutoHideBehavior.HideOnScroll
        Container {
            horizontalAlignment: HorizontalAlignment.Fill
            ListView {
                id: lt
                attachedObjects: [
                    // This handler is tracking the scroll state of the ListView.
                    ListScrollStateHandler {
                        id: scrollStateHandler

                    }
                ]
                dataModel: GroupDataModel {
                    id: gdm
                    grouping: ItemGrouping.None
                    sortedAscending: false
                    sortingKeys: [ "startdate" ]
                }
                onCreationCompleted: {
                    AJAX.getTEXT(baseurl + mkt, function(data) {
                            var d = JSON.parse(data);
                            gdm.insertList(d.images);
                        });
                }
                listItemComponents: [
                    ListItemComponent {
                        content: ScrollView {
                            WebView {
                                url: ListItemData.url.replace("1366x768", SET.size)
                                onUrlChanged: {
                                    console.log("url changed+" + url)
                                }
                            }
                        }
                        type: "item"
                    },
                    ListItemComponent {
                        content: Label {
                            text: qsTr("Bing wallpapers")
                        }
                        type: "header"
                    }
                ]
                onTriggered: {
                    console.log(JSON.stringify(gdm.data(indexPath).url));

                }
                horizontalAlignment: HorizontalAlignment.Fill
                layout: StackListLayout {
                    orientation: LayoutOrientation.LeftToRight
                    headerMode: ListHeaderMode.None

                }
                snapMode: SnapMode.LeadingEdge
                flickMode: FlickMode.SingleItem
            }

        }

    }
    attachedObjects: [
        ComponentDefinition {
            id: itemPageDefinition
            source: "ItemPage.qml"
        },
        HomeScreen {
            id: homescreen
        },
        WebView {
            id: w
        }
    ]
    onPopTransitionEnded: {
        page.destroy(5000)
    }
}
