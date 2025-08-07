import { reactive, readonly } from "vue";

type AlertType = "success" | "error" | "info";

interface AppState {
  isLoading: boolean;
  alert: {
    show: boolean;
    message: string;
    type: AlertType;
  };
}

const state = reactive<AppState>({
  isLoading: false,
  alert: {
    show: false,
    message: "",
    type: "info",
  },
});

function setLoading(value: boolean) {
  state.isLoading = value;
}

function alert(type: AlertType, message: string) {
  state.alert = {
    show: true,
    message,
    type,
  };

  setTimeout(() => {
    state.alert.show = false;
    state.alert.message = "";
  }, 3000);
}

// ✅ The name is now useStore (not useAppStore)
export function useStore() {
  return {
    state: readonly(state),
    setLoading,
    alert,
  };
}
