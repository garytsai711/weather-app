import { ref } from "vue";

export function useGeolocation() {
  const coords = ref<{ lat: number; lon: number } | null>(null);
  const error = ref<string | null>(null);
  const loading = ref(false);

  function getLocation() {
    if (!navigator.geolocation) {
      error.value = "Geolocation not supported.";
      return;
    }
    loading.value = true;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        coords.value = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
        error.value = null;
        loading.value = false;
      },
      (err) => {
        error.value = err.message || "Location access denied or failed.";
        loading.value = false;
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }

  return { coords, error, loading, getLocation };
}
