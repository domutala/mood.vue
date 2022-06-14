<template>
  <div class="md-date">
    <div class="header">
      <button @click="go_next_or_prev_month(-1)">
        <md-svg name="chevron-left" width="12" />
      </button>
      <div class="current" @click="open_selecter = true">
        {{ months[month] }}
        {{ year }}
      </div>
      <button @click="go_next_or_prev_month(1)">
        <md-svg name="chevron-right" width="12" />
      </button>
    </div>
    <div class="group" :style="{ width: `${carret * 7}px` }">
      <div
        v-for="day in weekdays"
        :key="day"
        class="day name"
        :style="{ width: `${carret}px`, height: `${carret}px` }"
      >
        {{ day[0] }}
      </div>
    </div>

    <div
      ref="content"
      class="content"
      :style="{ width: `${carret * 7}px`, height: `${carret * 6}px` }"
    >
      <div
        ref="container"
        class="container"
        :style="{
          left: `${-(carret * 7) + drag_dist}px`,
          transitionDuration: `${transition_duration}s`,
        }"
      >
        <div v-for="(pack, p) in dates_packets" :key="p">
          <div class="group" :style="{ width: `${carret * 7}px` }">
            <div
              v-for="(date, d) in pack"
              :key="d"
              class="day"
              :class="{
                disable: date.month_position !== 'current',
                is_today: date.is_today,
                is_current: date.is_current,
              }"
              :style="{ width: `${carret}px`, height: `${carret}px` }"
              @click="submit(date)"
            >
              {{ date.date.date() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import moment, { weekdays, months } from "moment";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import "./style.scss";

type MyDate = {
  date: moment.Moment;
  month_position: "next" | "current" | "prev";
  is_today: boolean;
  is_current: boolean;
};

@Component
export default class NDateBase extends Vue {
  @Prop({ type: Date, default: () => moment().toDate() })
  value!: Date;

  val = new Date();
  month = 0;
  year = 0;

  month_selecter = 0;
  year_selecter = 0;

  months2: number[][] = [];
  years2: number[][] = [];

  dates: MyDate[] = [];
  dates_next: MyDate[] = [];
  dates_prev: MyDate[] = [];

  carret = 36;
  transition_duration = 0.5;
  drag_dist = 0;
  working = false;
  open_selecter = false;

  sens: "next" | "prev" = "next";
  dragStarted = false;
  dragStartTo = 0;
  dragDist = 0;

  get weekdays() {
    return weekdays();
  }

  get months() {
    return months();
  }

  get dates_packets() {
    return [this.dates_prev, this.dates, this.dates_next];
  }

  mounted() {
    this.start();
  }

  beforeDestroy() {
    window.removeEventListener("resize", this.buildGraph);
  }

  start() {
    this.buildGraph();
    window.addEventListener("resize", this.buildGraph);

    if (this.value) {
      const date = moment(this.value);
      if (date.isValid()) this.val = date.toDate();
    }

    this.build0(moment(this.val));
    this.startDrag();
  }

  submit(mydate: MyDate) {
    if (mydate.month_position !== "current") return;

    const date = mydate.date.clone();
    this.$emit("input", date.toDate());
  }

  @Watch("value")
  onVal() {
    if (this.value) {
      const date = moment(this.value);

      if (!moment(this.val).isSame(date)) {
        if (date.isValid()) this.val = date.toDate();
      }
    }

    this.build0(moment(this.val));
  }

  buildGraph() {
    this.carret = 36;
    const parent = this.$el.parentElement;
    this.months2 = [];

    if (parent) this.carret = parent.offsetWidth / 7;
    if (this.carret < 36) this.carret = 36;
  }

  build0(date: moment.Moment) {
    this.dates = this.build(date);

    this.month_selecter = this.month = date.month();
    this.year_selecter = this.year = date.year();
  }

  build(date: moment.Moment) {
    const today = moment();
    const dates: MyDate[] = [];

    const push_in_dates = (
      z: moment.Moment,
      month_position: "next" | "current" | "prev"
    ) => {
      dates[month_position === "prev" ? "unshift" : "push"]({
        date: z,
        month_position,
        is_today: z.isSame(today, "days"),
        is_current: moment(this.val).isSame(z, "days"),
      });
    };

    let d = 1;
    while (d !== date.date()) {
      const clone = date.clone();
      const k = clone.subtract(date.date() - d, "days").format("YYYY-MM-DD");

      const z = moment(k);
      push_in_dates(z, "current");

      d++;
    }

    let e = date.date();
    while (e <= date.daysInMonth()) {
      const clone = date.clone();
      const k = clone.add(e - date.date(), "days").format("YYYY-MM-DD");

      const z = moment(k);
      push_in_dates(z, "current");

      e++;
    }

    const first = dates[0].date.clone();
    let f = first.day();
    while (f > 0) {
      const clone = first.clone();
      const k = clone
        .subtract(first.day() - f + 1, "days")
        .format("YYYY-MM-DD");

      const z = moment(k);
      push_in_dates(z, "prev");

      f--;
    }

    while (dates.length !== 42) {
      const clone = dates[dates.length - 1].date.clone();
      const k = clone.add(1, "days").format("YYYY-MM-DD");

      const z = moment(k);
      push_in_dates(z, "next");
    }

    // const last = dates[dates.length - 1].date.clone();
    // let g = last.day() + 1;
    // let h = 1;
    // while (g <= 6) {
    //   const clone = last.clone();
    //   const k = clone.add(h, "days").format("YYYY-MM-DD");

    //   const z = moment(k);
    //   push_in_dates(z, "next");

    //   g++;
    //   h++;
    // }

    return dates;
  }

  @Watch("dates", { deep: true })
  onDateCurrentBuild() {
    let i = 0;
    let c = "";

    while (c !== "current") {
      c = this.dates[i].month_position;
      if (c !== "current") i++;
    }

    const date = this.dates[i].date.clone();

    let k = date.clone().add(1, "months").format("YYYY-MM-DD");
    this.dates_next = this.build(moment(k));

    k = date.clone().subtract(1, "months").format("YYYY-MM-DD");
    this.dates_prev = this.build(moment(k));
  }

  go_next_or_prev_month(sens: 1 | -1) {
    if (this.working) return;

    this.working = true;
    const t = this.carret * 7 * -sens;

    this.transition_duration = 0.5;
    this.drag_dist = t;

    setTimeout(() => {
      this.transition_duration = 0;

      let i = 0;
      let c = "";

      while (c !== "current") {
        c = this.dates[i].month_position;
        if (c !== "current") i++;
      }

      let date = this.dates[i].date.clone();
      let k = date.format("YYYY-MM-DD");
      date = moment(k);

      // current month
      k = date[sens === 1 ? "add" : "subtract"](1, "month").format(
        "YYYY-MM-DD"
      );
      date = moment(k);
      this.build0(date);

      this.working = false;
      this.drag_dist = 0;
    }, 500);
  }

  // drag
  startDrag() {
    const content = this.$refs.content as HTMLDivElement;
    content.addEventListener("mousedown", this.onDragStart);
    content.addEventListener("mousemove", this.onDrag);
    window.addEventListener("mouseup", this.onDragEnd);

    content.addEventListener("touchstart", this.onDragStart);
    content.addEventListener("touchmove", this.onDrag);
    window.addEventListener("touchend", this.onDragEnd);
  }

  onDragStart(e: MouseEvent | TouchEvent) {
    if (this.dragStarted) return;

    const x = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
    this.dragStarted = true;
    this.dragStartTo = x;
  }

  onDrag(e: MouseEvent | TouchEvent) {
    if (!this.dragStarted) return;
    e.preventDefault();

    const x = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
    const dist = x - this.dragStartTo;

    if (Math.abs(dist) <= this.carret * 7) {
      this.drag_dist = dist * 0.7;
    }
  }

  onDragEnd() {
    if (!this.dragStarted) return;

    this.dragStarted = false;
    this.dragStartTo = 0;

    if (Math.abs(this.drag_dist) > this.carret * 2) {
      const sens = this.drag_dist > 0 ? -1 : 1;
      this.go_next_or_prev_month(sens);
    } else {
      this.transition_duration = 0.5;
      this.drag_dist = 0;
      setTimeout(() => {
        this.transition_duration = 0;
      }, 500);
    }
  }
}
</script>
