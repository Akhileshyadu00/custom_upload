
export interface Section {
    slug: string;
    name: string;
    description: string;
    category: string;
    preview: string;
    code: string;
}

export const sections: Section[] = [
    {
        slug: "luxury-hero-banner",
        name: "Luxury Hero Banner",
        description: "A full-height hero banner with video background support, parallax effect, and elegant typography.",
        category: "Hero",
        preview: "/previews/luxury-hero.png",
        code: `{% stylesheet %}
.luxury-hero h1 {
  text-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.animate-fade-up {
  animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}

.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
{% endstylesheet %}

{% javascript %}
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.luxury-hero');
  if(!hero) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const img = hero.querySelector('img');
    if(img) {
      img.style.transform = \`scale(1.05) translateY(\${scrolled * 0.1}px)\`;
    }
  });
});
{% endjavascript %}

{%- style -%}
  .section-{{ section.id }}-padding {
    padding-top: {{ section.settings.padding_top | times: 0.75 | round: 0 }}px;
    padding-bottom: {{ section.settings.padding_bottom | times: 0.75 | round: 0 }}px;
  }

  @media screen and (min-width: 750px) {
    .section-{{ section.id }}-padding {
      padding-top: {{ section.settings.padding_top }}px;
      padding-bottom: {{ section.settings.padding_bottom }}px;
    }
  }
{%- endstyle -%}

<div class="luxury-hero relative h-screen w-full overflow-hidden section-{{ section.id }}-padding">
  {%- if section.settings.video_url != blank -%}
    <video class="absolute inset-0 h-full w-full object-cover" autoplay muted loop playsinline>
      <source src="{{ section.settings.video_url }}" type="video/mp4">
    </video>
  {%- elsif section.settings.image != blank -%}
    <img 
      src="{{ section.settings.image | image_url: width: 3840 }}" 
      class="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out scale-105"
      loading="lazy"
      alt="{{ section.settings.heading | escape }}"
    >
  {%- endif -%}

  <div class="absolute inset-0 bg-black/{{ section.settings.overlay_opacity }}"></div>
  
  <div class="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
    {%- if section.settings.subheading != blank -%}
      <p class="mb-4 text-sm font-medium tracking-[0.2em] uppercase animate-fade-up">
        {{ section.settings.subheading }}
      </p>
    {%- endif -%}
    
    <h1 class="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 animate-fade-up delay-100">
      {{ section.settings.heading }}
    </h1>
    
    {%- if section.settings.text != blank -%}
      <div class="max-w-2xl text-lg md:text-xl text-white/90 mb-10 animate-fade-up delay-200">
        {{ section.settings.text }}
      </div>
    {%- endif -%}

    <div class="flex flex-col sm:flex-row gap-4 animate-fade-up delay-300">
      {%- if section.settings.button_label_1 != blank -%}
        <a href="{{ section.settings.button_link_1 }}" class="button button--primary bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-colors">
          {{ section.settings.button_label_1 }}
        </a>
      {%- endif -%}
      
      {%- if section.settings.button_label_2 != blank -%}
        <a href="{{ section.settings.button_link_2 }}" class="button button--secondary border border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-colors">
          {{ section.settings.button_label_2 }}
        </a>
      {%- endif -%}
    </div>
  </div>
</div>

{% schema %}
{
  "name": "Luxury Hero",
  "settings": [
    {
      "type": "image_picker",
      "id": "image",
      "label": "Background Image"
    },
    {
      "type": "url",
      "id": "video_url",
      "label": "Video URL (MP4)",
      "info": "Overrides image if set"
    },
    {
      "type": "range",
      "id": "overlay_opacity",
      "min": 0,
      "max": 90,
      "step": 10,
      "unit": "%",
      "label": "Overlay Opacity",
      "default": 30
    },
    {
      "type": "text",
      "id": "subheading",
      "label": "Subheading",
      "default": "New Collection"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Elevate Your Style"
    },
    {
      "type": "richtext",
      "id": "text",
      "label": "Text",
      "default": "<p>Discover the new season essentials.</p>"
    },
    {
      "type": "text",
      "id": "button_label_1",
      "label": "Button 1 Label",
      "default": "Shop Now"
    },
    {
      "type": "url",
      "id": "button_link_1",
      "label": "Button 1 Link"
    },
    {
      "type": "text",
      "id": "button_label_2",
      "label": "Button 2 Label",
      "default": "View Lookbook"
    },
    {
      "type": "url",
      "id": "button_link_2",
      "label": "Button 2 Link"
    },
    {
      "type": "header",
      "content": "Padding"
    },
    {
      "type": "range",
      "id": "padding_top",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Padding Top",
      "default": 0
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Padding Bottom",
      "default": 0
    }
  ],
  "presets": [
    {
      "name": "Luxury Hero"
    }
  ]
}
{% endschema %}`
    },
    {
        slug: "minimal-product-grid",
        name: "Minimal Product Grid",
        description: "A clean, whitespace-heavy grid for displaying your best products with hover effects and quick add.",
        category: "Product",
        preview: "/previews/product-grid.png",
        code: `{% stylesheet %}
.product-card:hover .quick-add-btn {
  transform: translateY(0);
  opacity: 1;
}
.quick-add-btn {
  transform: translateY(10px);
}
@media (hover: none) {
  .quick-add-btn {
    opacity: 1;
    transform: translateY(0);
    position: relative;
    bottom: auto;
    left: auto;
    right: auto;
    margin: 1rem 0 0 0;
    width: 100%;
    border: 1px solid #e5e7eb;
  }
}
{% endstylesheet %}

{% javascript %}
document.querySelectorAll('.quick-add-btn').forEach(btn => {
  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    const id = btn.dataset.variantId;
    
    try {
      await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [{ id, quantity: 1 }] })
      });
      
      // Update cart drawer or show success message
      btn.innerText = 'Added';
      setTimeout(() => btn.innerText = 'Quick Add', 2000);
      
      // Trigger cart update event if theme supports it
      document.dispatchEvent(new CustomEvent('cart:refresh'));
      
    } catch (err) {
      console.error(err);
      btn.innerText = 'Error';
    }
  });
});
{% endjavascript %}

<div class="page-width py-16 px-4 md:px-8">
  <div class="flex flex-col items-center mb-12 text-center">
    <h2 class="text-3xl font-bold mb-4">{{ section.settings.title }}</h2>
    <div class="h-1 w-20 bg-black"></div>
  </div>

  <div class="grid grid-cols-2 md:grid-cols-{{ section.settings.columns_desktop }} gap-x-8 gap-y-12">
    {% for product in collections[section.settings.collection].products limit: section.settings.products_to_show %}
      <div class="product-card group relative">
        <a href="{{ product.url }}" class="block aspect-[3/4] overflow-hidden bg-gray-100 rounded-lg">
          <img 
            src="{{ product.featured_image | image_url: width: 600 }}" 
            class="h-full w-full object-cover transition duration-700 ease-in-out group-hover:scale-105" 
            alt="{{ product.title }}"
          >
          {% if product.images[1] %}
            <img 
              src="{{ product.images[1] | image_url: width: 600 }}" 
              class="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-700 group-hover:opacity-100" 
              alt="{{ product.title }}"
            >
          {% endif %}
          
          {% if product.compare_at_price > product.price %}
            <span class="absolute top-2 right-2 bg-white px-2 py-1 text-xs font-bold uppercase tracking-wider shadow-sm">
              Sale
            </span>
          {% endif %}
        </a>
        
        <div class="mt-4 flex flex-col items-start">
          <h3 class="text-base font-medium mb-1 group-hover:underline decoration-1 underline-offset-4">
            <a href="{{ product.url }}">{{ product.title }}</a>
          </h3>
          <div class="flex items-center gap-2 text-sm">
            {% if product.compare_at_price > product.price %}
              <span class="text-gray-900">{{ product.price | money }}</span>
              <span class="text-gray-400 line-through">{{ product.compare_at_price | money }}</span>
            {% else %}
              <span class="text-gray-900">{{ product.price | money }}</span>
            {% endif %}
          </div>
        </div>

        <button 
          class="quick-add-btn absolute bottom-[4.5rem] left-0 right-0 mx-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 bg-white text-black py-3 px-4 rounded shadow-lg font-medium hover:bg-black hover:text-white"
          data-variant-id="{{ product.selected_or_first_available_variant.id }}"
        >
          Quick Add
        </button>
      </div>
    {% endfor %}
  </div>
</div>

{% schema %}
{
  "name": "Minimal Grid",
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Heading",
      "default": "New Arrivals"
    },
    {
      "type": "collection",
      "id": "collection",
      "label": "Collection"
    },
    {
      "type": "range",
      "id": "products_to_show",
      "min": 4,
      "max": 12,
      "step": 1,
      "default": 6,
      "label": "Products to show"
    },
    {
      "type": "range",
      "id": "columns_desktop",
      "min": 2,
      "max": 4,
      "step": 1,
      "default": 3,
      "label": "Number of columns on desktop"
    }
  ],
  "presets": [
    {
      "name": "Minimal Grid"
    }
  ]
}
{% endschema %}`
    },
    {
        slug: "animated-testimonials",
        name: "Animated Testimonials",
        description: "Smoothly scrolling testimonials to build trust.",
        category: "Social Proof",
        preview: "/previews/testimonials.png",
        code: `{% stylesheet %}
.marquee-content {
  animation: scroll 40s linear infinite;
  width: max-content;
}

.marquee-wrapper:hover .marquee-content {
  animation-play-state: paused;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
{% endstylesheet %}

<div class="bg-slate-50 py-20 overflow-hidden">
  <div class="page-width text-center mb-16">
    <h2 class="text-3xl md:text-4xl font-bold mb-4">{{ section.settings.heading }}</h2>
    <div class="flex justify-center gap-1 text-yellow-400">
      {%- for i in (1..5) -%}
        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
      {%- endfor -%}
    </div>
  </div>

  <div class="marquee-wrapper relative w-full">
    <div class="marquee-content flex gap-8 py-4">
      {%- for block in section.blocks -%}
        <div class="testimonial-card flex-shrink-0 w-[350px] md:w-[400px] bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <p class="text-gray-600 mb-6 text-lg leading-relaxed">
            "{{ block.settings.quote }}"
          </p>
          <div class="flex items-center gap-4">
            {%- if block.settings.author_image != blank -%}
              <img src="{{ block.settings.author_image | image_url: width: 80 }}" class="w-12 h-12 rounded-full object-cover">
            {%- else -%}
              <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl font-bold">
                {{ block.settings.author | slice: 0, 1 }}
              </div>
            {%- endif -%}
            <div>
              <p class="font-bold text-gray-900">{{ block.settings.author }}</p>
              <p class="text-sm text-gray-400 capitalize">{{ block.settings.role }}</p>
            </div>
          </div>
        </div>
      {%- endfor -%}
      <!-- Duplicate content just for visual if JS loop is used or for pure CSS infinite scroll -->
      {%- for block in section.blocks -%}
        <div class="testimonial-card flex-shrink-0 w-[350px] md:w-[400px] bg-white p-8 rounded-2xl shadow-sm border border-gray-100" aria-hidden="true">
           <!-- Repeat content same as above -->
           <p class="text-gray-600 mb-6 text-lg leading-relaxed">"{{ block.settings.quote }}"</p>
           <div class="flex items-center gap-4">
             <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl font-bold">
                {{ block.settings.author | slice: 0, 1 }}
              </div>
             <div>
               <p class="font-bold text-gray-900">{{ block.settings.author }}</p>
             </div>
           </div>
        </div>
      {%- endfor -%}
    </div>
  </div>
</div>

{% schema %}
{
  "name": "Testimonials",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Loved by thousands"
    }
  ],
  "blocks": [
    {
      "type": "testimonial",
      "name": "Testimonial",
      "settings": [
        {
          "type": "textarea",
          "id": "quote",
          "label": "Quote",
          "default": "Best purchase I made all year."
        },
        {
          "type": "text",
          "id": "author",
          "label": "Author",
          "default": "Jane Doe"
        },
        {
          "type": "text",
          "id": "role",
          "label": "Role",
          "default": "Verified Buyer"
        },
        {
          "type": "image_picker",
          "id": "author_image",
          "label": "Author Image"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Testimonials Loop",
      "blocks": [
        {"type": "testimonial"},
        {"type": "testimonial"},
        {"type": "testimonial"}
      ]
    }
  ]
}
{% endschema %}`
    },
    {
        slug: "collection-showcase-split",
        name: "Collection Showcase Split",
        description: "50/50 split layout highlighting a featured collection.",
        category: "Collection",
        preview: "/previews/split.png",
        code: `<div class="flex flex-col md:flex-row h-auto md:h-[600px] w-full">
  <div class="w-full md:w-1/2 relative h-[400px] md:h-full">
    {%- if section.settings.image != blank -%}
      <img src="{{ section.settings.image | image_url: width: 1400 }}" class="absolute inset-0 w-full h-full object-cover">
    {%- else -%}
      {{ 'collection-1' | placeholder_svg_tag: 'absolute inset-0 w-full h-full object-cover bg-gray-200' }}
    {%- endif -%}
    
    <div class="absolute inset-0 bg-black/10"></div>
  </div>
  
  <div class="w-full md:w-1/2 flex flex-col justify-center items-center p-12 md:p-20 text-center bg-zinc-900 text-white">
    <span class="text-xs font-bold tracking-[0.2em] uppercase mb-6 text-zinc-400">
      {{ section.settings.subheading }}
    </span>
    
    <h2 class="text-4xl md:text-5xl font-serif mb-8 text-white">
      {{ section.settings.heading }}
    </h2>
    
    <div class="prose prose-invert text-zinc-300 mb-10 max-w-md">
      {{ section.settings.text }}
    </div>
    
    <a href="{{ section.settings.url }}" class="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-white px-8 font-medium text-black transition-all duration-300 hover:bg-white hover:text-black">
      <span class="mr-2">Explore Collection</span>
      <span class="group-hover:translate-x-1 transition-transform">→</span>
    </a>
  </div>
</div>

{% schema %}
{
  "name": "Split Collection",
  "settings": [
    {
      "type": "image_picker",
      "id": "image",
      "label": "Image"
    },
    {
      "type": "text",
      "id": "subheading",
      "label": "Subheading",
      "default": "Limited Edition"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "New Arrivals"
    },
    {
      "type": "richtext",
      "id": "text",
      "label": "Text",
      "default": "<p>Shop the latest trends fresh from the runway.</p>"
    },
    {
      "type": "url",
      "id": "url",
      "label": "Link"
    }
  ],
  "presets": [
    {
      "name": "Split Collection"
    }
  ]
}
{% endschema %}`
    },
    {
        slug: "scrolling-marquee-logos",
        name: "Scrolling Brand Logos",
        description: "Infinite scroll of partner logos.",
        category: "Social Proof",
        preview: "/previews/logos.png",
        code: `<div class="py-12 border-y border-gray-100 bg-white">
  {% if section.settings.heading != blank %}
    <p class="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">{{ section.settings.heading }}</p>
  {% endif %}
  
  <div class="flex flex-wrap justify-center md:justify-around items-center gap-8 md:gap-12 px-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
     {% for block in section.blocks %}
       {% if block.settings.logo != blank %}
         <img src="{{ block.settings.logo | image_url: width: 200 }}" class="h-8 md:h-12 w-auto object-contain" alt="{{ block.settings.logo.alt }}">
       {% else %}
         <span class="text-xl font-bold text-gray-300">LOGO {{ forloop.index }}</span>
       {% endif %}
     {% endfor %}
  </div>
</div>

{% schema %}
{
  "name": "Logo List",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "AS SEEN IN"
    }
  ],
  "blocks": [
    {
      "type": "logo",
      "name": "Logo",
      "settings": [
        {
          "type": "image_picker",
          "id": "logo",
          "label": "Logo Image"
        }
      ]
    }
  ],
  "presets": [
     {
       "name": "Logo List",
       "blocks": [
         {"type": "logo"},
         {"type": "logo"},
         {"type": "logo"},
         {"type": "logo"},
         {"type": "logo"}
       ]
     }
  ]
}
{% endschema %}`
    },
    {
        slug: "before-after-reveal",
        name: "Before/After Image Reveal",
        description: "Interactive slider to compare two images.",
        category: "Interactive",
        preview: "/previews/before-after.png",
        code: `{% stylesheet %}
.before-after-slider img {
  user-select: none;
}
.handle {
  pointer-events: none;
}
.after-image {
  will-change: width;
}
{% endstylesheet %}

{% javascript %}
document.querySelectorAll('.before-after-slider').forEach(slider => {
  const afterImage = slider.querySelector('.after-image');
  const handle = slider.querySelector('.handle');
  
  const update = (x) => {
    const rect = slider.getBoundingClientRect();
    let percentage = ((x - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    afterImage.style.width = \`\${percentage}%\`;
    handle.style.left = \`\${percentage}%\`;
  };

  slider.addEventListener('mousemove', (e) => update(e.clientX));
  slider.addEventListener('touchmove', (e) => update(e.touches[0].clientX));
});
{% endjavascript %}

<div class="page-width py-16 px-4">
  <div class="text-center mb-10">
    <h2 class="text-3xl font-bold">{{ section.settings.heading }}</h2>
  </div>

  <div class="relative w-full max-w-4xl mx-auto aspect-video cursor-ew-resize before-after-slider select-none rounded-xl overflow-hidden shadow-2xl">
    {%- if section.settings.image_before != blank -%}
      <img src="{{ section.settings.image_before | image_url: width: 2000 }}" class="absolute inset-0 w-full h-full object-cover" draggable="false">
    {%- else -%}
      {{ 'lifestyle-1' | placeholder_svg_tag: 'absolute inset-0 w-full h-full object-cover bg-gray-200' }}
    {%- endif -%}

    <div class="absolute inset-0 w-1/2 overflow-hidden after-image border-r-4 border-white">
      {%- if section.settings.image_after != blank -%}
        <img src="{{ section.settings.image_after | image_url: width: 2000 }}" class="absolute top-0 left-0 max-w-none w-full h-full object-cover" draggable="false">
      {%- else -%}
        {{ 'lifestyle-2' | placeholder_svg_tag: 'absolute top-0 left-0 max-w-none w-full h-full object-cover bg-gray-300' }}
      {%- endif -%}
    </div>
    
    <div class="absolute inset-y-0 left-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center top-1/2 -translate-y-1/2 handle -translate-x-1/2">
       <div class="flex gap-0.5">
         <div class="w-0.5 h-4 bg-gray-400"></div>
         <div class="w-0.5 h-4 bg-gray-400"></div>
       </div>
    </div>
    
    <!-- Labels -->
    <div class="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm font-bold backdrop-blur-sm">BEFORE</div>
    <div class="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-sm font-bold backdrop-blur-sm">AFTER</div>
  </div>
</div>

{% schema %}
{
  "name": "Before/After",
  "settings": [
    {
       "type": "text",
       "id": "heading",
       "label": "Heading",
       "default": "See the Difference"
    },
    {
      "type": "image_picker",
      "id": "image_before",
      "label": "Before Image"
    },
    {
      "type": "image_picker",
      "id": "image_after",
      "label": "After Image"
    }
  ],
  "presets": [
    {
      "name": "Before/After Slider"
    }
  ]
}
{% endschema %}`
    },
    {
        slug: "faq-accordion-modern",
        name: "FAQ Accordion Modern",
        description: "Expandable questions with smooth animations.",
        category: "Text",
        preview: "/previews/faq.png",
        code: `{% stylesheet %}
summary::-webkit-details-marker { display: none; }

.animate-slide-down {
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
{% endstylesheet %}

<div class="max-w-2xl mx-auto py-20 px-6">
  <div class="text-center mb-12">
    <h2 class="text-3xl font-bold mb-4">{{ section.settings.heading }}</h2>
    <p class="text-gray-500">{{ section.settings.text }}</p>
  </div>
  
  <div class="divide-y divide-gray-100 border-t border-b border-gray-100">
    {% for block in section.blocks %}
      <details class="group py-6">
        <summary class="flex justify-between items-center cursor-pointer list-none font-medium text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">
          {{ block.settings.question }}
          <span class="transition transform group-open:rotate-180">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </summary>
        <div class="text-gray-600 mt-4 leading-relaxed animate-slide-down">
          {{ block.settings.answer }}
        </div>
      </details>
    {% endfor %}
  </div>
</div>

{% schema %}
{
  "name": "FAQ",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Questions?"
    },
    {
      "type": "text",
      "id": "text",
      "label": "Subtext",
      "default": "We are here to help."
    }
  ],
  "blocks": [
    {
      "type": "question",
      "name": "Question",
      "settings": [
        {
          "type": "text",
          "id": "question",
          "label": "Question",
          "default": "What is your return policy?"
        },
        {
          "type": "richtext",
          "id": "answer",
          "label": "Answer",
          "default": "<p>You can return items within 30 days.</p>"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "FAQ Accordion",
      "blocks": [
        {"type": "question"},
        {"type": "question"},
        {"type": "question"}
      ]
    }
  ]
}
{% endschema %}`
    },
    {
        slug: "feature-icons-section",
        name: "Feature Icons Section",
        description: "Highlight key product features with icons.",
        category: "Text",
        preview: "/previews/icons.png",
        code: `<div class="py-20 px-4 bg-white">
  <div class="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
    {% for block in section.blocks %}
      <div class="flex flex-col items-center group">
        <div class="h-16 w-16 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6 transition-transform group-hover:scale-110 duration-300">
           {% if block.settings.icon_svg != blank %}
             {{ block.settings.icon_svg }}
           {% else %}
             <!-- Default Icon -->
             <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
           {% endif %}
        </div>
        <h4 class="font-bold text-lg mb-2">{{ block.settings.title }}</h4>
        <p class="text-sm text-gray-500 max-w-xs mx-auto">{{ block.settings.text }}</p>
      </div>
    {% endfor %}
  </div>
</div>

{% schema %}
{
  "name": "Feature Icons",
  "blocks": [
    {
      "type": "feature",
      "name": "Feature",
      "settings": [
        {
          "type": "html",
          "id": "icon_svg",
          "label": "SVG Icon Code"
        },
        {
          "type": "text",
          "id": "title",
          "label": "Title",
          "default": "Free Shipping"
        },
        {
          "type": "textarea",
          "id": "text",
          "label": "Text",
          "default": "Free shipping on all orders over $100"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Feature Icons",
      "blocks": [
        {"type": "feature"},
        {"type": "feature"},
        {"type": "feature"},
        {"type": "feature"}
      ]
    }
  ]
}
{% endschema %}`
    },
    {
        slug: "modern-newsletter",
        name: "Modern Newsletter",
        description: "Minimalist email subscription form.",
        category: "Forms",
        preview: "/previews/newsletter.png",
        code: `<div class="bg-zinc-900 text-white py-24 px-4 text-center">
  <div class="max-w-xl mx-auto">
    <div class="mb-6 flex justify-center">
      <svg class="h-8 w-8 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </div>
    <h2 class="text-3xl md:text-4xl font-bold mb-4">{{ section.settings.heading }}</h2>
    <p class="text-zinc-400 mb-8">{{ section.settings.text }}</p>
    
    {% form 'customer', class: 'flex flex-col sm:flex-row gap-3' %}
      <input type="hidden" name="contact[tags]" value="newsletter">
      <input 
        type="email" 
        name="contact[email]"
        placeholder="Enter your email" 
        required
        class="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-white placeholder:text-zinc-500"
      >
      <button type="submit" class="bg-white text-black hover:bg-gray-100 font-medium px-6 py-3 rounded-lg transition-colors">
        Subscribe
      </button>
    {% endform %}
    
    <p class="text-xs text-zinc-600 mt-4">
      By subscribing you agree to our Terms & Privacy Policy.
    </p>
  </div>
</div>

{% schema %}
{
  "name": "Newsletter",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Join the Club"
    },
    {
      "type": "text",
      "id": "text",
      "label": "Text",
      "default": "Subscribe for exclusive updates."
    }
  ],
  "presets": [
    {
      "name": "Modern Newsletter"
    }
  ]
}
{% endschema %}`
    },
    {
        slug: "lifestyle-story",
        name: "Lifestyle Image + Story",
        description: "Editorial style layout for brand storytelling.",
        category: "Image",
        preview: "/previews/story.png",
        code: `<div class="py-20 px-4 md:px-8 max-w-7xl mx-auto">
  <div class="md:flex items-center gap-16">
    <div class="md:w-1/2 mb-10 md:mb-0 relative">
      <div class="aspect-[4/5] bg-gray-200 rounded-2xl overflow-hidden relative shadow-xl">
        {% if section.settings.image != blank %}
          <img src="{{ section.settings.image | image_url: width: 1200 }}" class="absolute inset-0 w-full h-full object-cover">
        {% else %}
           {{ 'image' | placeholder_svg_tag: 'absolute inset-0 w-full h-full object-cover bg-gray-200' }}
        {% endif %}
      </div>
      <!-- Decorative -->
      <div class="absolute -bottom-6 -right-6 w-40 h-40 bg-indigo-50 rounded-full -z-10 hidden md:block"></div>
    </div>
    
    <div class="md:w-1/2">
      <span class="text-indigo-600 font-bold tracking-wider text-sm uppercase mb-4 block">{{ section.settings.eyebrow }}</span>
      <h2 class="text-4xl md:text-5xl font-serif mb-6 leading-tight">{{ section.settings.heading }}</h2>
      <div class="space-y-6 text-gray-600 leading-relaxed text-lg">
        {{ section.settings.text }}
      </div>
      
      {% if section.settings.link_label != blank %}
        <a href="{{ section.settings.link }}" class="group inline-flex items-center mt-8 text-indigo-600 font-medium hover:text-indigo-700">
          {{ section.settings.link_label }} 
          <svg class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </a>
      {% endif %}
    </div>
  </div>
</div>

{% schema %}
{
  "name": "Story",
  "settings": [
    {
      "type": "image_picker",
      "id": "image",
      "label": "Image"
    },
    {
      "type": "text",
      "id": "eyebrow",
      "label": "Eyebrow Text",
      "default": "Our Story"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Crafting Quality"
    },
    {
      "type": "richtext",
      "id": "text",
      "label": "Text",
      "default": "<p>We believe in quality over quantity.</p>"
    },
    {
      "type": "text",
      "id": "link_label",
      "label": "Link Label",
      "default": "Read more"
    },
    {
      "type": "url",
      "id": "link",
      "label": "Link"
    }
  ],
  "presets": [
    {
      "name": "Lifestyle Story"
    }
  ]
}
{% endschema %}`
    }
];
