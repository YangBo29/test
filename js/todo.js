let vm = new Vue({
  el: "#app",
  created() {
    this.todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    this.hash = window.location.hash || '#/all';
    window.addEventListener('hashchange', () => {
      this.hash = window.location.hash;
    }, false);
  },
  data: {
    hash: '', // 哈西值
    title: '', // 任务信息
    todos: [], // 列表数据
    cur: '', // 当前获取光标的节点
    addShow: false // 创建input显示状态
  },
  computed: {
    count() {
      return this.todos.filter((item) => {
        return !item.isSelected;
      }).length;
    },
    recounts() {
      if (this.hash === '#/all') {
        return this.todos;
      }
      if (this.hash === '#/finish') {
        return this.todos.filter((item) => {
          return item.isSelected;
        })
      }
      if (this.hash === '#/unfinish') {
        return this.todos.filter((item) => {
          return !item.isSelected;
        })
      }
    }
  },
  watch: {
    todos: {
      handler(newVal) {
        localStorage.setItem('todos', JSON.stringify(newVal));
      },
      deep: true
    }
  },
  methods: {
    add() {
      if (this.title === '') return;
      this.todos.push({
        isSelected: false,
        title: this.title
      });
      this.title = '';
      this.addShow = false;
    },
    edit(todo) {
      this.cur = todo;
    },
    config() {
      this.cur = '';
    },
    remove(todo) {
      this.todos = this.todos.filter((item) => {
        return item != todo;
      })
    },
    addHandle() {
      this.addShow = true;
    },
    cancelHandle() {
      this.addShow = false;
      this.title = '';
    }
  },
  directives: {
    focus(el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  }
});