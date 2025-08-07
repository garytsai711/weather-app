<template>
  <div class="content-area">
    <div class="header-section">
      <div class="header-section__title">
        <button @click="goBack">
          <img
            src="@/assets/images/general/chevron-left-black.png"
            alt="Back"
          />
        </button>
        <h3>Edit Profile</h3>
      </div>
    </div>

    <div class="user-section">
      <div class="icon">
        <span class="avatar">
          <img src="@/assets/images/profile/avatar.png" alt="User" />
        </span>
        <span class="edit" v-if="isEditing">
          <img src="@/assets/images/profile/edit.png" alt="Edit" />
        </span>
      </div>
      <div class="info">
        <div class="name">{{ userInfo.fullName }}</div>
        <div class="details">
          <span>{{ userInfo.email }}</span
          >|
          <span>{{ userInfo.phoneNumber }}</span>
        </div>
      </div>
    </div>

    <fieldset
      :disabled="!isEditing || store.state.isLoading"
      class="body-section"
    >
      <InputGroup
        label="Full name"
        v-model="profile.fullName"
        :error="errors.fullName"
      />
      <InputGroup label="Email" v-model="profile.email" :error="errors.email" />
      <InputGroupTelephone
        label="Phone Number"
        v-model="profile.phoneNumber"
        :error="errors.phoneNumber"
        inputType="number"
      />
    </fieldset>

    <div class="footer-section">
      <Button
        class="standard-button"
        :disabled="store.state.isLoading"
        @click="handleEditOrSave"
      >
        <span v-if="store.state.isLoading">Saving...</span>
        <span v-else>{{ isEditing ? "Save" : "Edit" }}</span>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, reactive } from "vue";
import { useStore } from "@/stores/useStore";
import InputGroup from "@/components/molecules/InputGroup.vue";
import InputGroupTelephone from "@/components/molecules/InputGroupTelephone.vue";
import Button from "@/components/atoms/Form/Button.vue";
import profileSchema from "@/pages/Profile/schema/profileSchema";
import { useValidation } from "@/composables/useValidation";

const router = useRouter();

const store = useStore();
const { errors, validate } = useValidation(profileSchema);

const isEditing = ref(false);

const userInfo = reactive({
  fullName: "Gary Tsai",
  email: "hsinloong711@outlook.com",
  phoneNumber: "0146686748",
});

const profile = reactive({
  fullName: userInfo.fullName,
  email: userInfo.email,
  phoneNumber: userInfo.phoneNumber,
});

async function handleEditOrSave() {
  if (!isEditing.value) {
    // Enter edit mode
    isEditing.value = true;
    profile.fullName = userInfo.fullName;
    profile.email = userInfo.email;
    profile.phoneNumber = userInfo.phoneNumber;
  } else {
    // Save mode
    // VALIDATE FIRST!
    const isValid = validate(profile);
    if (!isValid) {
      // Show first error in alert
      const firstError = Object.values(errors).find(Boolean);
      store.alert("error", String(firstError));
      return;
    }
    store.setLoading(true);
    try {
      // Simulate API request
      await new Promise((res) => setTimeout(res, 1200));
      userInfo.fullName = profile.fullName;
      userInfo.email = profile.email;
      userInfo.phoneNumber = profile.phoneNumber;
      store.alert("success", "Profile updated successfully!");
      isEditing.value = false;
    } catch (e) {
      store.alert("error", "Update failed, try again!");
    } finally {
      store.setLoading(false);
    }
  }
}

function goBack() {
  router.back();
}
</script>

<style scoped>
.header-section {
  position: relative;
  width: 100%;
  height: 206px;
  background-image: url("@/assets/images/profile/bg-profile.png");
  background-size: cover;
  background-position: center;
  padding: var(--size-16);
}

.header-section__title {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--size-12) 0;
}

.header-section__title button {
  position: absolute;
  left: 0;
  width: 9px;
  height: var(--size-12);
}

.header-section__title button img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.header-section__title h3 {
  font-family: "Poppins", sans-serif;
  font-weight: var(--semi-bold);
  letter-spacing: 0.3px;
}

.user-section {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -60px;
  z-index: 2;
  gap: var(--size-16);
  margin-bottom: var(--size-12);
}

.user-section .icon {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-section .icon .avatar {
  width: 120px;
  height: 120px;
  border-radius: var(--border-circle);
}

.user-section .icon .avatar img {
  width: 100%;
  height: 100%;
  border-radius: var(--border-circle);
  object-fit: cover;
}

.user-section .icon .edit {
  position: absolute;
  right: -8px;
  bottom: -8px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 46px;
  height: 46px;
  background: var(--light-grey);
  border: 5px solid var(--white);
  border-radius: var(--border-circle);
}

.user-section .icon .edit img {
  width: var(--size-32);
  height: var(--size-24);
  border-radius: var(--border-circle);
  object-fit: contain;
}

.user-section .info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--size-4);
}

.user-section .info .name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 200px;
  text-align: center;
}

.user-section .info .details {
  display: flex;
  align-items: center;
  gap: var(--size-4);
}

.user-section .info .details span:nth-child(1) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px;
  text-align: center;
}

.user-section .info .details span:nth-child(2) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100px;
  text-align: center;
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  .user-section .info .details span:nth-child(1) {
    max-width: 300px;
  }
  .user-section .info .details span:nth-child(2) {
    max-width: 180px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .user-section .info .details span:nth-child(1) {
    max-width: 500px;
  }
  .user-section .info .details span:nth-child(2) {
    max-width: 250px;
  }
}

.body-section {
  padding: var(--size-16);
  padding-bottom: 82px;
}

.footer-section {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  margin: 0 auto;
  padding: var(--size-16);
  font-size: var(--text-lg);
  background: var(--white);
  z-index: 99;
}

.footer-section .standard-button {
  text-transform: uppercase;
}
</style>
