import { mount } from "@vue/test-utils";
import App from "../App.vue";

// eslint-disable-next-line no-undef
describe("Component", () => {
  // eslint-disable-next-line no-undef
  test("is a Vue instance", () => {
    const wrapper = mount(App);
    // eslint-disable-next-line no-undef
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
