<template>
	<view class="box">
		<u-tabs class="tab-box" :list="weeks" @change="change"></u-tabs>
		<view v-if="select == week.week" class="week-box" v-for="(week, w_index) in weeks" :key="w_index">
			<view class="class-box" :title="item.time" name="Docs guide" v-for="(item, c_index) in week.class"
				:key="c_index" v-show="item.students.length > 0">
				<view class="class-header">
					<u--text :text="item.time"></u--text>
				</view>
				<uni-card spacing="0" padding="0">
					<u-cell-group :border="false">
						<u-cell :title="student.name" :border="false" v-for="(student, s_index) in item.students"
							:key="s_index" @tap="tooltip(week, item, student)">
							<view class="cell-menu" slot="value">
								<view class="menu-button" @click.stop="send(week, item, student)">
									<u-button class="send" text="发送"></u-button>
								</view>
								<view class="menu-button" @click.stop="send(week, item, student)">
									<u-button class="edit" text="编辑"></u-button>
								</view>
							</view>
						</u-cell>
					</u-cell-group>
				</uni-card>
			</view>
		</view>
		<u-popup :show="show" mode="center" @close="show = false">
			<view class="pop-toast">
				<text>{{ toast }}</text>
				<u-button text="发送" @tap="copy"></u-button>
			</view>
		</u-popup>
		<u-modal :show="isFirst" title="选择老师" :showConfirmButton="false">
			<view slot="default">
				<u-button text="君君老师" @click="selectT(0)"></u-button>
				<u-button text="Fric老师" @click="selectT(1)"></u-button>
			</view>
		</u-modal>

	</view>
</template>

<script>
	import jj from '../data/jj.json';
	import ly from '../data/ly.json';
	export default {
		data() {
			return {
				select: 2,
				weeks: [],
				show: false,
				toast: '',
				isFirst: true,
			};
		},
		onLoad() {
			uni.getStorage({
				key: 'teacher',
				success: function (res) {
					if(res.data) {
						this.isFirst = false
						let teacher = res.data
						switch (teacher) {
							case 0:
								this.weeks = jj;
								break;
							case 1:
								this.weeks = ly;
								break;
							default:
								break;
						}
					}
					
				}
			});
		},
		methods: {
			change(e) {
				this.select = e.week;
			},
			tooltip(week, item, student) {
				this.generate(week, item, student);
				this.show = true;
			},
			send(week, item, student) {
				this.generate(week, item, student);
				this.copy();
			},
			copy() {
				uni.setClipboardData({
					data: this.toast,
					success: function() {
						uni.$u.toast('复制成功！');
					}
				});
			},
			selectT(teacher) {
				this.isFirst = false;
				uni.setStorage({
					key: 'teacher',
					data: teacher,
					success: function () {
						console.log('success');
					}
				});
				switch (teacher) {
					case 0:
						this.weeks = jj;
						break;
					case 1:
						this.weeks = ly;
						break;
					default:
						break;
				}
			},
			generate(week, item, student) {
				let weekTimes = this.getDates();
				let date = new Date();
				let timeStr = '';
				let noonStr = '';
				if (date.getDay() == week.week) {
					timeStr = uni.$u.timeFormat(date, 'mm月dd日');
					noonStr = '今天';
				} else {
					noonStr = '明天';
					let result = weekTimes.filter(t => t.getDay() == week.week);
					timeStr = uni.$u.timeFormat(result[0], 'mm月dd日');
				}
				let isAm = date.getDay() == week.week ? '今天' : '明天';
				this.toast =
					student.petName +
					((student.parent && student.parent.length) > 0 ? student.parent : '妈妈') +
					'您好\n☘️' +
					noonStr +
					item.time.slice(0, 2) +
					'有咱们宝贝的乐高课，记得准时到课哈[玫瑰]\n⏰上课时间：' +
					'' +
					timeStr +
					'(' +
					week.name +
					')' +
					item.time +
					'\n🏠上课教室：' +
					item.room +
					'\n👨‍🏫授课老师：' + item.teacher +
					'\n温馨提示：\n①请佩戴口罩，签到进店\n②校区有开水，可以为宝贝带上水杯\n③校区有开空调，可为宝贝带上薄外套\n‍——————— ——————————\n📖锋格练字正式上线啦[哇]\n👉五岁以上的宝贝均可报名参加体验🔥️\n☝️预售优惠名额有限，快快找我抢购吧🖐️';
			},
			getDates() {
				var new_Date = new Date();
				var timesStamp = new_Date.getTime();
				var currenDay = new_Date.getDay();
				var dates = [];
				for (var i = 0; i < 7; i++) {
					dates.push(
						new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - ((currenDay + 6) % 7)))
						// .toLocaleDateString()
						// .replace(/[年月]/g, '-')
						// .replace(/[日上下午]/g, '')
					);
				}
				return dates;
			}
		}
	};
</script>

<style lang="scss">
	.box {
		/deep/ .u-tabs {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background-color: #fff;
		}

		/deep/ .u-collapse-item__content__text {
			padding: 0 0 !important;
		}

		.class-header {
			margin: 30rpx;
		}

		.cell-menu {
			display: flex;
			flex-direction: row;
			justify-content: center;

			.u-button {
				width: 100rpx !important;
				height: 60rpx !important;
				margin-left: 20rpx !important;
				color: #fff !important;
				border-radius: 30rpx !important;
			}

			.menu-button:first-child {
				.u-button {
					margin: 0;
					background-color: #e67470 !important;
				}
			}

			.menu-button:last-child {
				.u-button {
					background-color: #f0b054 !important;
				}
			}
		}

		/deep/ .u-popup__content {
			border-radius: 20rpx;
			margin: 40rpx !important;

			.pop-toast {
				margin: 40rpx;
				border-radius: 10rpx;
			}

			.u-button {
				color: #fff;
				margin: 40rpx 0 0 0;
				background-color: #e67470;
			}
		}
	}
</style>
