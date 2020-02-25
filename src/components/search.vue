<template>
  <div id="_search_bar" class="mod-search">
    <div class="search-panel">
      <div class="search-input">
        <input
          placeholder="搜索全部"
          autocomplete="off"
          type="text"
          aria-label="输入文件名并按下回车进行搜索"
          tabindex="0"
          class="mod-input"
        />
      </div>
      <div class="search-placeholder"><Icon type="ios-search" style="font-size: 22px;margin: 9px 20px 0px 20px;"/></div>
    </div>
    <div class="lazy_person-search-pannel" style="display: none;">
      <div class="mod-menu-group" style="">
        <div class="menu-group" style="display: none;">
          <div class="menu-group-hd"><p class="tit">搜搜看</p></div>
          <div class="menu-group-bd"><ul class="menu-list"></ul></div>
        </div>
        <div class="menu-group" style="">
          <div class="menu-group-hd">
            <p class="tit">历史记录</p>
            <div class="hd-act">
              <a href="javascript:void(0)" class="btn-clear">清除记录</a>
            </div>
          </div>
          <div class="menu-group-bd">
            <ul class="menu-list">
              <li class="menu-list-item">
                <span class="item-txt">111</span>
                <span title="删除" class="item-act"
                  ><i class="icon icon-close"></i
                ></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="lazy_team-search-pannel" style="display: none;">
      <div class="mod-menu-group" style="display: none;">
        <div class="menu-group" style="display: none;">
          <div class="menu-group-hd">
            <p class="tit">历史记录</p>
            <div class="hd-act">
              <a href="javascript:void(0)" class="btn-clear">清除记录</a>
            </div>
          </div>
          <div class="menu-group-bd"><ul class="menu-list"></ul></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'view-design'
export default {
  name: 'search',
  components: {
    Icon
  }
}
</script>

<style>
.mod-search {
    margin: 20px 24px 0;
    z-index: 8;
    position: relative;
}
.mod-search {
    position: relative;
    z-index: 90
}

.mod-search .close {
    display: none;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    text-align: center;
    width: 36px;
    z-index: 5
}

.mod-search .close .icon {
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -12px 0 0 -12px
}

.mod-search .search-panel {
    background: #e8e8e8;
    padding: 0 10px;
    border-radius: 2px;
    height: 36px
}

.mod-search .search-input {
    height: 36px
}

.mod-search .search-panel {
    -ms-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid transparent
}

.mod-search.focus .search-panel,.mod-search:hover .search-panel {
    background: #e4e4e4
}

.mod-search.focus .search-panel {
    background: #fff;
    box-shadow: 0 1px 4px rgba(15,32,66,.2);
    border: 1px solid #c8ccd3
}

.mod-search .mod-input {
    display: block;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 36px;
    line-height: 36px;
    padding: 0 10px 0 34px;
    border-radius: 4px;
    color: #000;
    z-index: 4;
    border: 0 none;
    background: 0 0
}

.mod-search .icon-search,.mod-search .icon-search-s {
    margin: 0 13px 0 9px;
    top: -1px
}

.mod-search.focus .mod-input,.mod-search.istext .mod-input {
    color: #000;
    opacity: 1
}

.mod-search .search-placeholder {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 5;
    line-height: 36px;
    pointer-events: none
}

.mod-search .search-close {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 30px;
    text-align: center;
    z-index: 5;
    line-height: 36px;
    display: none;
    cursor: pointer
}

.mod-search.focus .search-close {
    display: block
}

.mod-search .search-placeholder .txt {
    vertical-align: middle;
    color: #9b9b9b;
    position: relative;
    top: -1px
}

.mod-search.focus .search-placeholder .txt {
    display: none
}

.mod-search label {
    position: absolute;
    left: 38px;
    top: 10px;
    height: 13px;
    line-height: 17px;
    color: #a2a2a2
}

.mod-nav.disabled .mod-search:hover {
    border-color: #d5d7df
}

.mod-nav.disabled .mod-search:hover .icon-search {
    /* background-image: url(sprite/page-home@2x.png); */
    background-position: -767px -428px;
    background-size: 810px 719px
}

.mod-search .mod-menu-group {
    position: absolute;
    left: 0;
    top: 35px
}

.mod-search .mod-menu-group {
    visibility: hidden
}

.mod-search.focus .mod-menu-group {
    visibility: visible
}

.mod-search .mod-menu-group {
    max-height: 0;
    opacity: 0;
    width: 260px;
    overflow: scroll
}

.mod-search.focus .mod-menu-group {
    max-height: 360px;
    overflow-y: auto;
    opacity: 1;
    width: 338px
}

.mod-search-m .search-panel {
    background: #fff;
    border-color: #dbdbdb
}

.mod-search-m .search-panel:hover {
    background: #fff
}
</style>
