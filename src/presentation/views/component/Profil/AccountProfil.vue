<script lang="ts" setup>

</script>
<template>
       <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h3 class="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">Account Settings</h3>
            
            <div class="divide-y divide-gray-100">
              <div class="py-3 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="p-2 bg-gray-100 rounded-lg text-gray-600"><Bell :size="18" /></div>
                  <div>
                    <p class="text-sm font-bold text-gray-800">Push Notifications</p>
                    <p class="text-xs text-gray-500">Receive alerts about order status updates</p>
                  </div>
                </div>
                <input type="checkbox" checked class="w-4 h-4 rounded border-gray-300 accent-[#F5BE18] cursor-pointer" />
              </div>

              <div class="py-3 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="p-2 bg-gray-100 rounded-lg text-gray-600"><Lock :size="18" /></div>
                  <div>
                    <p class="text-sm font-bold text-gray-800">Password</p>
                    <p class="text-xs text-gray-500">Last changed 3 months ago</p>
                  </div>
                </div>
                <button type="button"  class="text-xs font-bold text-[#F5BE18] hover:underline cursor-pointer">Change</button>
              </div>

              <div class="py-3 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="p-2 bg-red-50 rounded-lg text-red-500"><LogOut :size="18" /></div>
                  <div>
                    <p class="text-sm font-bold text-red-600">Sign Out</p>
                    <p class="text-xs text-gray-500">Log out from this device</p>
                  </div>
                </div>
                <button type="button"  class="px-3 py-1.5 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors cursor-pointer">
                  Logout
                </button>
              </div>
            </div>
          </div>
</template>