<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/*官方ui库*/
	@import 'common/uni.css';
	/*动画库*/
	@import 'common/animate.css';
	/*图标库*/
	@import 'common/icon.css';
	/*自定义库*/
	@import 'common/common.css';
	/*UI基础库*/
	@import 'common/zcm-main.css';
</style>
