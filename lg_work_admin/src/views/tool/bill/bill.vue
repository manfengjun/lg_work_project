<template>
	<el-tabs type="border-card">
		<el-tab-pane v-for="bill in bills" :label="bill.name" :key="bill.name">
			<div class="button-style">
				<el-button type="primary" v-for="student in bill.students" :key="student.name" @click="click(student)">{{ student.name }}</el-button>
			</div>
		</el-tab-pane>
	</el-tabs>
	<el-button type="danger" class="export-image" @click="exportAsImage">导出为图片</el-button>
	<div id="bill" class="container">
		<div class="content">
			<p>
				<el-text class="h-font">{{ student.name }}</el-text>
				<el-text>小朋友你好：</el-text>
			</p>
			<p><el-text>恭喜你又长大了一岁！</el-text></p>
			<p>
				<el-text class="h-font">{{ student.start }}</el-text>
				<el-text>这天你开始学习编程</el-text>
			</p>
			<p>
				<el-text>已经坚持了</el-text>
				<el-text class="h-font">{{ student.day }}</el-text>
				<el-text>天啦</el-text>
			</p>
			<p>
				<el-text>在此期间，你上了</el-text>
				<el-text class="h-font">{{ student.count }}</el-text>
				<el-text>节课</el-text>
			</p>
			<p>
				<el-text>学习了</el-text>
				<el-text class="h-font">{{ student.time }}</el-text>
				<el-text>分钟</el-text>
			</p>
			<p>
				<el-text>解锁了</el-text>
				<el-text class="h-font">5大能力目标:</el-text>
			</p>
			<p>
				<el-text class="h-font">专注力、动手能力、想象力、</el-text>
			</p>
			<p>
				<el-text class="h-font">合作力、逻辑力</el-text>
			</p>
			<p v-if="student.game != ''">
				<el-text>完成</el-text>
				<el-text class="h-font">{{ student.game }}</el-text>
				<el-text>场机器人竞赛，获得了</el-text>
				<el-text class="h-font">{{ student.game_count }}</el-text>
				<el-text>枚奖牌</el-text>
			</p>

			<p>
				<el-text>超越了</el-text>
				<el-text class="h-font">{{ student.data }}%</el-text>
				<el-text>的同学</el-text>
			</p>
			<p>
				<el-text class="h-font">{{ student.vital }}</el-text>
				<el-text>是最难忘的一天</el-text>
			</p>
			<p>
				<el-text>你学习了</el-text>
				<el-text class="h-font">{{ student.class }}</el-text>
				<el-text>级别的课程</el-text>
			</p>
			<p>
				<el-text>感谢你的坚持与努力</el-text>
			</p>
			<p>
				<el-text>年度</el-text>
				<el-text class="h-font">学习之星</el-text>
				<el-text>就是你啦!</el-text>
			</p>
			<p>
				<el-text>期待你在</el-text>
				<el-text class="h-font">2025</el-text>
				<el-text>年的表现哦</el-text>
			</p>
			<p>
				<el-text>我将继续陪伴你成长</el-text>
			</p>
			<p>
				<el-text>爱你呦~</el-text>
			</p>
		</div>
		<div class="photo">
			<el-image style="width: 201px; height: 268px" :src="getImage(student.name, student.teacher)" />
		</div>
		<div class="teacher">
			<p>
				<el-text>贝乐创想家</el-text>
				<el-text class="h-font">{{ student.teacher }}</el-text>
				<el-text>老师</el-text>
			</p>
			<p>
				<el-text class="h-font">2024年12月31日</el-text>
			</p>
		</div>
	</div>
</template>
<script lang="ts" setup>
	import { ref } from "vue";
	import bills from "../../../assets/bill/data.json";
	import html2canvas from "html2canvas";
	var student = ref(bills[0].students[0]);
	const click = (item: any) => {
		student.value = item;
		console.log(student);
	};
	const getImage = (name: string, teacher: string) => {
		var file = "";
		switch (teacher) {
			case "君君":
				file = "jj";
				break;
			case "晨晨":
				file = "cc";
				break;
			case "木子":
				file = "mz";
				break;
			case "叶子":
				file = "yz";
				break;

			default:
				break;
		}
		return "http://spiptlmsm.hd-bkt.clouddn.com/" + file + "/" + name + ".jpg";
	};
	async function exportAsImage() {
		try {
			const element = document.getElementById("bill");
			if (!element) return;

			const canvas = await html2canvas(element, {
				useCORS: true,
				backgroundColor: "#ffffff"
			});
			const img = canvas.toDataURL("image/png");

			const link = document.createElement("a");
			link.href = img;
			link.setAttribute("download", student.value.name + ".png");
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (error) {
			console.error("Error exporting HTML to image:", error);
		}
	}
</script>
<style>
	.container {
		display: block;
		margin: 20px;
		width: 820px;
		height: 1159.42px;
		background-image: url("../../../assets/bill/bg.png");
		background-size: cover;
		/* 背景图片覆盖整个页面 */
		background-repeat: no-repeat;
		/* 背景图片不重复 */
		background-position: center;
		/* 背景图片居中 */
	}

	@font-face {
		font-family: "Bill";
		src: url("../../../assets/bill/bill.ttf") format("truetype");
		font-weight: normal;
		font-style: normal;
	}

	.content {
		float: left;
		text-align: left;
		padding-top: 360px;
		padding-left: 60px;
		font-size: 20px !important;
		font-family: "Bill", Arial, sans-serif !important;
		color: rgb(0, 80, 173) !important;
	}
	.export-image {
		width: 200px;
		height: 50px;
	}
	.button-style {
		text-align: left;
	}
	.photo {
		float: right;
		margin-right: 100px;
		margin-top: 500px;
	}
	.photo img {
		border-radius: 5px;
	}

	.ep-button {
		margin: 8px;
	}

	.ep-text {
		font-size: 20px;
		font-family: "Bill", Arial, sans-serif;
		color: rgb(0, 80, 173);
	}

	.h-font {
		font-size: 22px !important;
		color: rgb(233, 139, 0) !important;
		font-weight: bold !important;
	}

	.content p {
		margin: 6px 0;
	}
	.teacher {
		float: right;
		margin-top: 120px;
		margin-right: 100px;
	}
	.teacher p {
		margin: 0px;
	}
	.hight {
		color: #ff6600;
		font-weight: bold;
	}
</style>
