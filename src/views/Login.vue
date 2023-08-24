<template>
    <div class="content">
        <canvas id="canvas3d"></canvas>
        <div class="formmer">
            <a-tabs class="tabs" v-model:activeKey="activeKey">
                <a-tab-pane key="1">
                    <template #tab>
                        <span>
                            <user-outlined />
                            登陆
                        </span>
                    </template>

                    <a-form :model="formState" name="normal_login" class="login-form" @finish="values=>{onFinish(values)}"
                        @finishFailed="onFinishFailed">
                        <a-form-item label="用户名" name="username"
                            :rules="[{ required: true, message: 'Please input your username!' }]">
                            <a-input v-model:value="formState.username">
                                <template #prefix>
                                    <UserOutlined class="site-form-item-icon" />
                                </template>
                            </a-input>
                        </a-form-item>

                        <a-form-item label="密码" name="password"
                            :rules="[{ required: true, message: 'Please input your password!' }]">
                            <a-input-password v-model:value="formState.password">
                                <template #prefix>
                                    <LockOutlined class="site-form-item-icon" />
                                </template>
                            </a-input-password>
                        </a-form-item>

                        <!-- <a-form-item>
                            <a-form-item name="remember" no-style>
                                <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
                            </a-form-item>
                            <a class="login-form-forgot" href="">Forgot password</a>
                        </a-form-item> -->

                        <a-form-item>
                            <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
                                登录
                            </a-button>
                        </a-form-item>
                    </a-form>


                </a-tab-pane>
                <a-tab-pane key="2">
                    <template #tab>
                        <span>
                            <user-add-outlined />
                            注册
                        </span>
                    </template>
                    注册form
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>

<script setup>
import { Application } from '@splinetool/runtime';
import { UserAddOutlined, UserOutlined , LockOutlined} from '@ant-design/icons-vue';
import { onMounted, ref ,reactive, computed} from "vue"
import home from "@/store/index"
import {useRouter} from "vue-router"

onMounted(() => {
    const canvas = document.getElementById('canvas3d');
    const app = new Application(canvas);
    app.load('https://prod.spline.design/Q8oYhvjWYmMJIgrT/scene.splinecode');
})
const router = useRouter();
const store = home();
const activeKey = ref('1')

const formState = reactive({
  username: '',
  password: '',
  remember: true,
});

const onFinish = async values => {
  console.log('Success:', values);
  let res = await store.login(values);
  if(!_.isEmpty(res)){
    router.push('/index')
  }
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
  return !(formState.username && formState.password);
});





</script>

<style lang="scss" scoped>
.content {
    width: 100vw;
    height: 100vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

#canvas3d {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 0;
}

.formmer {
    position: relative;
    z-index: 1;
    width: 370px;
    height: 320px;
    box-shadow: 3px 3px 10px -5px;
    background-color: rgba($color: #fff, $alpha: .9);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 20px;

    .tabs {
        width: 100%;
    }
}

#components-form-demo-normal-login .login-form {
    max-width: 300px;
  }
  #components-form-demo-normal-login .login-form-forgot {
    float: right;
  }
  #components-form-demo-normal-login .login-form-button {
    width: 100%;
  }
</style>