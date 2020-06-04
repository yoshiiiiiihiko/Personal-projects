export default{
	data() {
		return {
			notReady:true
		}
	},
	onReady() {
		this.$nextTick(()=>{
			setTimeout(()=>{
				this.notReady = false
			},1000)
		})
	},
}