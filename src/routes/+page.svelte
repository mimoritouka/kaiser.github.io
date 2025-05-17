<script lang="ts">
	import InlineSvg from "$lib/components/InlineSvg.svelte";
  import { onMount } from "svelte";
  
  // Sample tech stack data
  const techStack = [
    { name: "Svelte", icon: "https://unpkg.com/simple-icons@latest/icons/svelte.svg", color: "orange-500" },
    { name: "TypeScript", icon: "https://unpkg.com/simple-icons@latest/icons/typescript.svg", color: "blue-500" },
    { name: "Tailwind CSS", icon: "https://unpkg.com/simple-icons@latest/icons/tailwindcss.svg", color: "cyan-500" },
    { name: "Node.js", icon: "https://unpkg.com/simple-icons@latest/icons/nodedotjs.svg", color: "green-600" },
  ];
  
  // Sample goals data
  const goals = [
    { title: "Web Geliştirme", description: "Modern web teknolojileri ile kullanıcı dostu uygulamalar geliştirmek" },
    { title: "Mobil Uygulama", description: "Mobil platformlar için kullanıcı deneyimi odaklı uygulamalar oluşturmak" },
    { title: "Açık Kaynak", description: "Açık kaynak projelerine katkı sağlamak ve toplulukla işbirliği yapmak" },
  ];
  
  let isMobile = $state(false);
  
  onMount(() => {
    checkIsMobile();
  });
  
  function checkIsMobile() {
    isMobile = window.innerWidth <= 768;
  }
</script>

<svelte:window on:resize={checkIsMobile} />

<main class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
  <!-- Hero Section -->
  <section class="adw-container py-12 items-center justify-center flex md:py-16">
    <div class="adw-card mobile:p-6 p-8">
      <div class="flex flex-col md:flex-row gap-8 items-center">
        <!-- Profile Image -->
        <div class="relative">
          <div class="p-1 bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 rounded-full shadow-lg">
            <div class="bg-white dark:bg-gray-800 rounded-full p-2">
              <img 
                src="./img.jpg" 
                alt="Kaiser profile" 
                class="w-150 mobile:w-32 rounded-full object-cover"
              />
            </div>
          </div>
        </div>
        
        <!-- Hero Text -->
        <div class="flex flex-col text-center md:text-left">
          <h1 class="text-3xl md:text-4xl font-bold text-indigo-900 dark:text-indigo-300">
            Selam, ben <span class="text-indigo-500">Kaiser</span>
          </h1>
          <p class="text-lg md:text-xl text-gray-600 dark:text-gray-400 mt-2">
            Elektrik-Elektronik öğrencisiyim (pişmanlık) 18 yaşındayım normal bir insanım galiba; yeni şeyler öğrenmeye meraklıyım, oyun oynamayı çok severim. Onun dışında son zamanlarda ders çalışıyorum (YKS dolayısıyla). İletişime geçmek istersen aşağıda sosyal medya hesaplarım bulunuyor.
          </p>
          <div class="flex gap-3 mt-4 justify-center md:justify-start hidden">
            <button class="adw-button adw-button-primary">
              <i class="fa-solid fa-envelope mr-2"></i>İletişime Geç
            </button>
            <button class="adw-button">
              <i class="fa-solid fa-download mr-2"></i>CV İndir
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Tech Stack Section -->
  <section id="tech_stack" class="py-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
    <div class="adw-container">
      <h2 class="text-2xl md:text-3xl font-semibold mb-8 text-center">
        <i class="fa-solid fa-code mr-2 text-indigo-600 dark:text-indigo-400"></i>
        Tech Stack
      </h2>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        {#each techStack as tech}
          <div class="adw-card p-4 flex flex-col items-center text-center hover:scale-105 transition-transform">
            {#if tech.icon.startsWith("http")}
              <InlineSvg src={tech.icon} className={`w-10 h-10 mb-3 text-${tech.color}`} />
            {:else}
              <i class={`${tech.icon} text-${tech.color} fill-${tech.color} text-3xl mb-3`}></i>
            {/if}
            <h3 class="font-medium">{tech.name}</h3>
          </div>
        {/each}
      </div>
    </div>
  </section>


  <!-- Goals Section -->
  <section id="goals" class="py-12">
    <div class="adw-container">
      <h2 class="text-2xl md:text-3xl font-semibold mb-8 text-center">
        <i class="fa-solid fa-bullseye mr-2 text-indigo-600 dark:text-indigo-400"></i>
        Hedeflerim
      </h2>
      
      <div class="grid md:grid-cols-3 gap-6">
        {#each goals as goal, i}
          <div class="adw-card p-6 hover:shadow-md transition-all">
            <div class="w-10 h-10 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900 rounded-full mb-4">
              <span class="text-indigo-700 dark:text-indigo-300 font-bold">{i + 1}</span>
            </div>
            <h3 class="text-xl font-medium mb-2">{goal.title}</h3>
            <p class="text-gray-600 dark:text-gray-400">{goal.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>
</main>
