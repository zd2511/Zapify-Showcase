const artworks = [
  {title:"The Starry Night",year:"June 1889",quote:"“I look at the stars and with all my being feel that I am a part of one of these stars.”",medium:"Oil on canvas",dimensions:"73.7 × 92.1 cm",image:"https://upload.wikimedia.org/wikipedia/commons/e/ea/The_Starry_Night.JPG",artist:"Vincent van Gogh",dates:"1853 – 1890",style:"Dutch · Post-Impressionist",movement:"Post-Impressionism",artistImage:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg/120px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg",bio:"A Dutch Post-Impressionist painter whose expressive brushwork and vivid color helped reshape modern art."},
  {title:"Water Lilies",year:"1906",quote:"A quiet study of light, reflection, and the changing surface of a garden pond.",medium:"Oil on canvas",dimensions:"89.9 × 94.1 cm",image:"https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1400&q=90",artist:"Claude Monet",dates:"1840 – 1926",style:"French · Impressionist",movement:"Impressionism",artistImage:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=85",bio:"A leading Impressionist known for painting the same landscapes in changing light and atmosphere."},
  {title:"Blue Reverie",year:"c. 1890",quote:"Color and movement turn the canvas into a place to wander, pause, and look again.",medium:"Oil on canvas",dimensions:"Private collection",image:"https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1400&q=90",artist:"Paul Cézanne",dates:"1839 – 1906",style:"French · Post-Impressionist",movement:"Post-Impressionism",artistImage:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=85",bio:"Cézanne explored structure and form, influencing generations of modern artists."},
  {title:"Golden Fields",year:"1888",quote:"A sunlit landscape with warm color, textured brushwork, and a sense of open air.",medium:"Oil on canvas",dimensions:"72 × 91 cm",image:"https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1400&q=90",artist:"Vincent van Gogh",dates:"1853 – 1890",style:"Dutch · Post-Impressionist",movement:"Post-Impressionism",artistImage:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg/120px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg",bio:"Van Gogh used bold color and energetic brushwork to express the feeling of a place."},
  {title:"Garden in Spring",year:"c. 1890",quote:"A lush garden scene that celebrates the beauty of nature and the rhythm of color.",medium:"Oil on canvas",dimensions:"Collection varies",image:"https://images.unsplash.com/photo-1577083288073-40892c0860a4?auto=format&fit=crop&w=1400&q=90",artist:"Henri Rousseau",dates:"1844 – 1910",style:"French · Naïve art",movement:"Post-Impressionism",artistImage:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=85",bio:"Rousseau developed a distinctive dreamlike style, with richly detailed foliage and imaginative scenes."}
];
let current=0, saved=false, toastTimer;
const $=id=>document.getElementById(id);
const featuredImage=$('featuredImage');
function notify(message){const t=$('toast');t.textContent=message;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),2100)}
function render(index){
 current=(index+artworks.length)%artworks.length; const a=artworks[current];
 $('artTitle').textContent=a.title;$('artYear').textContent=a.year;$('artQuote').textContent=a.quote;$('artMedium').textContent=a.medium;$('artDimensions').textContent=a.dimensions;
 featuredImage.src=a.image;featuredImage.alt=`${a.title} — featured artwork`;
 $('artistName').textContent=a.artist;$('artistDates').textContent=a.dates;$('artistStyle').textContent=a.style;$('artistPortrait').src=a.artistImage;$('artistPortrait').alt=`${a.artist} portrait`;
 $('progressFill').style.width=`${((current+1)/artworks.length)*100}%`;
 $('favoriteBtn').textContent='♡';$('favoriteBtn').classList.toggle('active',saved);saved=false;
 document.querySelectorAll('.card-back').forEach((card,i)=>{card.style.opacity=(i===current%4)?'.92':'.75';card.style.filter=`hue-rotate(${current*7}deg)`});
 $('modalImage').src=a.image;$('modalTitle').textContent=a.title;$('modalDescription').textContent=`${a.artist} · ${a.year}. ${a.medium}. ${a.quote.replace(/[“”]/g,'')}`;
 $('infoName').textContent=a.artist;$('infoText').textContent=a.bio;$('infoDates').textContent=a.dates;$('infoMovement').textContent=a.movement;
}
function step(n){render(current+n)}
$('prevBtn').addEventListener('click',()=>step(-1));$('artistPrev').addEventListener('click',()=>step(-1));$('artistNext').addEventListener('click',()=>step(1));
document.querySelectorAll('.card-back').forEach(card=>card.addEventListener('click',()=>render(Number(card.dataset.index))));
$('expandBtn').addEventListener('click',()=>{$('artModal').classList.add('open');$('artModal').setAttribute('aria-hidden','false');document.body.style.overflow='hidden'});
function closeModal(){$('artModal').classList.remove('open');$('artModal').setAttribute('aria-hidden','true');document.body.style.overflow=''}
$('closeModal').addEventListener('click',closeModal);$('modalBackdrop').addEventListener('click',closeModal);
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();$('infoPanel').classList.remove('open')}if(e.key==='ArrowLeft')step(-1);if(e.key==='ArrowRight')step(1)});
$('favoriteBtn').addEventListener('click',()=>{saved=!saved;$('favoriteBtn').textContent=saved?'♥':'♡';$('favoriteBtn').classList.toggle('active',saved);notify(saved?'Added to your saved artworks':'Removed from saved artworks')});
$('copyLink').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(`${location.href.split('#')[0]}#artwork-${current+1}`);notify('Artwork link copied')}catch(e){notify('Use your browser share option to share this artwork')}});
$('shareBtn').addEventListener('click',async()=>{const a=artworks[current];try{if(navigator.share)await navigator.share({title:`${a.title} — Zapify Showcase`,text:`Explore ${a.title} by ${a.artist}`,url:location.href});else{await navigator.clipboard.writeText(location.href);notify('Showcase link copied')}}catch(e){}});
function openInfo(){$('infoPanel').classList.add('open');$('infoPanel').setAttribute('aria-hidden','false')}
$('artistInfoBtn').addEventListener('click',openInfo);$('artistInfoPill').addEventListener('click',openInfo);$('closeInfo').addEventListener('click',()=>{$('infoPanel').classList.remove('open');$('infoPanel').setAttribute('aria-hidden','true')});
$('moreBtn').addEventListener('click',()=>notify('More artwork options coming into focus'));
$('sidebarToggle').addEventListener('click',()=>notify('Welcome to Zapify Showcase'));
$('backBtn').addEventListener('click',()=>step(-1));$('forwardBtn').addEventListener('click',()=>step(1));
let touchStartX=0;document.querySelector('.gallery').addEventListener('touchstart',e=>{touchStartX=e.changedTouches[0].screenX},{passive:true});document.querySelector('.gallery').addEventListener('touchend',e=>{const dx=e.changedTouches[0].screenX-touchStartX;if(Math.abs(dx)>50)step(dx<0?1:-1)},{passive:true});
render(0);
