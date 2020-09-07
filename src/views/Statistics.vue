<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"></Tabs>
    <ol v-if="groupedList.length>0">
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">
          {{beautify(group.title)}}
          <span>{{type}} {{group.total}}</span>
        </h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{tagString(item.tags)}}</span>
            <span class="sta-notes">{{item.notes}}</span>
            <span>￥{{item.amount}}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">
      目前没有相关记录
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import intervalList from "@/constants/intervalList";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone.ts";

@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  // 计算属性
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    const recordList = this.recordList;

    //对recordList中的记录按生成时间进行排序
    const newList = clone(recordList)
      .filter((r) => r.type === this.type)
      .sort(
        (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
      );
    if (newList.length === 0) {
      return [];
    }
    // newList中的记录按生成时间从晚到早排序

    type Result = {
      title: string;
      total?: number;
      items: RecordItem[];
    }[];

    const result: Result = [
      {
        title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
        items: [newList[0]],
      },
    ];

    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createdAt).format("YYYY-MM-DD"),
          items: [current],
        });
      }
    }

    result.map((group) => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    });
    // 针对result中的每一个group对象，将对象的items拿来使用reduce方法，设置一个累加值sum(初始值赋为0)，对items中的每一个item，都把它的amount拿出来加给sum 最终sum就是这一个group对象中的每一个items.item中的amount的和
    return result;
  }

  tagString(tags: Tag[]) {
    return tags.length === 0 ? "无" : tags.map(t => t.name).join(",");
  }

  beforeCreate() {
    this.$store.commit("fetchRecords");
  }

  beautify(string: string) {
    const day = dayjs(string);
    // 获取列表中的那个时间，转化成dayjs对象
    const now = dayjs();
    // 获取当前时间

    if (day.isSame(now, "day")) {
      // 如果列表中的时间和当前时间是同一天
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      // 如果列表中的时间和当前时间的昨天是同一天
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      // 如果列表中的时间和当前时间的昨天是同一天
      return "前天";
    } else if (day.isSame(now, "year")) {
      // 如果列表中的时间和当前时间是同一年
      return day.format("M月M日");
      // 不返回年份，只返回 几月几日
    } else {
      return day.format("YYYY年M月M日");
    }
  }

  type = "-";
  recordTypeList = recordTypeList;
}
</script>

<style scoped lang="scss">
.noResult {
  padding: 16px;
  text-align: center;
}
::v-deep .type-tabs-item {
  background: #9cdcf8;
  &.selected {
    background: #9cdcf8;
    &::after {
    }
  }
}
::v-deep .interval-tabs-item {
  height: 48px;
}

.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  min-height: 40px;
}
.record {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  min-height: 40px;
  padding: 0 16px;
}
.sta-notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
</style>