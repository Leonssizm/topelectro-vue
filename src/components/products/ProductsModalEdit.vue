<template>
  <div>
    <div class="flex w-1/3 flex-col rounded border bg-green-100">
      <div class="mt-5 flex justify-around">
        <div class="mb-4 px-2">
          <label class="mb-1 block text-sm">Product Name:</label>
          <input
            class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
            type="text"
            autofocus
            placeholder="Name"
          />
        </div>
        <div class="mb-4 px-2">
          <label class="mb-1 block text-sm">SQ:</label>
          <input
            class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
            type="text"
            autofocus
            placeholder="SQ"
          />
        </div>
      </div>
      <div class="flex justify-around">
        <div class="mb-4 px-2">
          <label class="mb-1 block text-sm">Price:</label>
          <input
            class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
            type="text"
            autofocus
            placeholder="Price"
          />
        </div>
        <div class="mb-4 px-2">
          <label class="mb-1 block text-sm">Wholesale Price:</label>
          <input
            class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
            type="text"
            autofocus
            placeholder="Wholesale Price"
          />
        </div>
      </div>
      <div class="flex justify-around">
        <div class="px-2">
          <div class="flex flex-col items-center">
            <label class="mb-1 block text-sm">Image:</label>
            <input
              type="file"
              class="text-grey-500 text-sm file:mr-5 file:rounded-full file:border-0 file:bg-blue-50 file:py-2 file:px-6 file:text-sm file:font-medium file:text-blue-700 hover:file:cursor-pointer hover:file:bg-amber-50 hover:file:text-amber-700"
              accept="image"
              @change="pictureDisplayAndStore"
            />
          </div>
        </div>
        <div class="px-2">
          <div class="flex flex-col items-center">
            <label class="mb-1 block text-sm">Color:</label>
            <input
              type="text"
              class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
              placeholder="color"
            />
          </div>
        </div>
      </div>
      <!-- <div id="preview" class="mt-8 flex justify-center">
        <img v-if="imageUrl" :src="imageUrl" />
      </div> -->
      <!-- Select category -->
      <div>
        <div class="mb-4 flex px-2">
          <div class="mb-3 xl:w-96">
            <label>Select Category</label>
            <select
              id="categorySelection"
              class="form-select m-0 block w-full appearance-none rounded border border-solid border-gray-300 bg-white bg-clip-padding bg-no-repeat px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
              aria-label="Default select example"
            >
              <option hidden>Select Category</option>
            </select>
          </div>
        </div>
        <div class="mb-4 flex">
          <p></p>
        </div>
      </div>

      <div class="mb-4 px-2">
        <div class="flex flex-col">
          <label class="mb-1 block text-sm">Details:</label>
          <textarea
            type="text"
            class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
            placeholder="specify details"
          ></textarea>
        </div>
      </div>
      <div class="mb-2 flex justify-around">
        <button
          class="rounded bg-green-500 py-2 px-3 font-bold text-white hover:bg-green-700"
          type="button"
        >
          Save Changes
        </button>
        <button
          type="button"
          class="rounded bg-red-500 py-2 px-3 font-bold text-white hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup></script>
