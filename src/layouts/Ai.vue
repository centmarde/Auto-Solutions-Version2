<template>
    <div ref="chatContainer">
      <v-card v-if="isOpen" class="chat-box" elevation="10" tile>
        <v-btn icon @click="toggleChat" class="collapse-btn">
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
  
        <v-card-text class="chat-content">
          <div class="message-container">
            <div v-for="(message, index) in messages" :key="index" class="message">
              <div :class="message.sender === 'user' ? 'user-message' : 'ai-message'">
                {{ message.text }}
              </div>
            </div>
          </div>
        </v-card-text>
  
        <v-card-actions>
          <v-text-field
            v-model="newMessage"
            label="Type a message..."
            solo-inverted
            flat
            hide-details
            dense
            @keyup.enter="sendMessage"
          ></v-text-field>
          <v-btn icon @click="sendMessage">
            <v-icon>mdi-send</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
  
      <v-btn
        ref="aiIcon"
        v-else
        class="ai-icon"
        icon
        large
        @click="toggleChat"
        :class="{ shaking: isShaking }"
      >
        <v-icon>mdi-robot</v-icon>
      </v-btn>
  
      <div ref="helloLine" class="hello-line">Hello!</div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
  import { gsap } from 'gsap';
  import { getResponse } from '../seed/responseAi'; // Update this import based on your file structure
  
  const isOpen = ref(false);
  const newMessage = ref('');
  const messages = ref([{ sender: 'ai', text: 'Hello! How can I assist you today?' }]);
  const isShaking = ref(false);
  const helloLine = ref(null);
  const chatContainer = ref(null);
  
  const toggleChat = () => {
    isOpen.value = !isOpen.value;
    isShaking.value = !isOpen.value;
  };
  
  const sendMessage = async () => {
    if (newMessage.value.trim()) {
      messages.value.push({ sender: 'user', text: newMessage.value });
  
      const aiResponse = await getResponse(newMessage.value);
      messages.value.push({ sender: 'ai', text: aiResponse });
  
      newMessage.value = '';
    }
  };
  
  const startShaking = () => {
    isShaking.value = true;
    setInterval(() => {
      if (!isOpen.value) {
        isShaking.value = true;
        setTimeout(() => {
          isShaking.value = false;
        }, 300);
      }
    }, 4000);
  };
  
  const animateHelloLine = () => {
    gsap.to(helloLine.value, {
      opacity: 1,
      y: -10,
      duration: 0.5,
      onComplete: () => {
        gsap.to(helloLine.value, {
          opacity: 0,
          y: 0,
          duration: 0.5,
          delay: 3
        });
      }
    });
  };
  
  const triggerHelloLineAnimation = () => {
    if (!isOpen.value) {
      animateHelloLine();
    }
  };
  
  const handleClickOutside = (event) => {
    if (isOpen.value && !chatContainer.value.contains(event.target) && event.target !== $refs.aiIcon) {
      isOpen.value = false;
    }
  };
  
  onMounted(() => {
    gsap.set(helloLine.value, { opacity: 0, y: 0 });
    if (!isOpen.value) {
      startShaking();
      setInterval(triggerHelloLineAnimation, 15000);
    }
    document.addEventListener('click', handleClickOutside);
  });
  
  watch(isOpen, (newValue) => {
    if (newValue) {
      isShaking.value = false;
      gsap.to(helloLine.value, { opacity: 0 });
    }
  });
  
  // Cleanup event listener
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
  });
  </script>
  
  <style scoped>
  .chat-box {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 300px;
    max-height: 400px;
    z-index: 9999;
    overflow-y: auto;
  }
  
  .ai-icon {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #6200ea;
    color: white;
    z-index: 9999;
    transition: transform 0.1s;
  }
  
  .collapse-btn {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  
  .shaking {
    animation: rotate 0.5s forwards;
  }
  
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(15deg);
    }
    50% {
      transform: rotate(-15deg);
    }
    75% {
      transform: rotate(15deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
  
  .hello-line {
    position: fixed;
    bottom: 70px;
    right: 20px;
    background-color: rgba(98, 0, 234, 0.9);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
    z-index: 9999;
    opacity: 0;
  }
  
  .chat-content {
    max-height: 300px;
    overflow-y: auto;
  }
  
  .message {
    margin: 8px 0;
  }
  
  .user-message {
    text-align: right;
    background-color: #151515;
    color: #EEEEEE;
    padding: 8px;
    border-radius: 10px;
  }
  
  .ai-message {
    text-align: left;
    background-color: #151515;
    color: #EEEEEE;
    padding: 8px;
    border-radius: 10px;
  }
  </style>
  