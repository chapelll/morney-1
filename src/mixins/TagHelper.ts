import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export class TagHelper extends Vue {
    
    createTag() {
        const name = window.prompt("请输入标签名");
        if (name) {
            this.$store.commit('createTag', name)
        } else if (name === "") {
            alert("标签名不能为空!");
            return
        } else {
            //用户点击了取消
            return
        }
    }
}

export default TagHelper