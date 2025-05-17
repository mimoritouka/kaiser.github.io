<script lang="ts">
    import { onMount } from 'svelte';
    import { tick } from 'svelte';
  
    export let src: string;
    export let fill: string = 'currentColor';
    export let className: string = '';
  
    let svgContent = '';
  
    // SVG'i fetch edip içine fill ve class ekleyen fonksiyon
    async function fetchSvg() {
      if (!src) {
        svgContent = '';
        return;
      }
  
      const res = await fetch(src);
      let text = await res.text();
      // <svg ...> etiketine fill ve class ekle
      text = text.replace(
        /<svg([^>]*?)>/,
        `<svg$1 fill="${fill}" class="${className}">`
      );
      svgContent = text;
      // Svelte reactive döngüsünün tamamlanması için
      await tick();
    }
  
    // İlk yüklemede
    onMount(fetchSvg);
  
    // src veya fill değiştiğinde yeniden yükle
    $: if (src || fill) {
      fetchSvg();
    }
  </script>
  
  {@html svgContent}
  