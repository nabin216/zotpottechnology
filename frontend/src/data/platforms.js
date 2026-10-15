import shopifyRaw from 'simple-icons/icons/shopify.svg?raw'
import wordpressRaw from 'simple-icons/icons/wordpress.svg?raw'
import wixRaw from 'simple-icons/icons/wix.svg?raw'
import woocommerceRaw from 'simple-icons/icons/woocommerce.svg?raw'
import reactRaw from 'simple-icons/icons/react.svg?raw'
import nextRaw from 'simple-icons/icons/nextdotjs.svg?raw'
import figmaRaw from 'simple-icons/icons/figma.svg?raw'
import n8nRaw from 'simple-icons/icons/n8n.svg?raw'
import flutterRaw from 'simple-icons/icons/flutter.svg?raw'
import dockerRaw from 'simple-icons/icons/docker.svg?raw'
import googleAdsRaw from 'simple-icons/icons/googleads.svg?raw'
import metaRaw from 'simple-icons/icons/meta.svg?raw'

function withFill(svg, hex) {
  return svg.replace('<path ', `<path fill="#${hex}" `)
}

export const platforms = [
  { name: 'Shopify', svg: withFill(shopifyRaw, '7AB55C') },
  { name: 'WordPress', svg: withFill(wordpressRaw, '21759B') },
  { name: 'Wix', svg: withFill(wixRaw, '0C6EFC') },
  { name: 'WooCommerce', svg: withFill(woocommerceRaw, '96588A') },
  { name: 'React', svg: withFill(reactRaw, '149ECA') },
  { name: 'Next.js', svg: withFill(nextRaw, '000000') },
  { name: 'Figma', svg: withFill(figmaRaw, 'F24E1E') },
  { name: 'n8n', svg: withFill(n8nRaw, 'EA4B71') },
  { name: 'Flutter', svg: withFill(flutterRaw, '02569B') },
  { name: 'Docker', svg: withFill(dockerRaw, '2496ED') },
  { name: 'Google Ads', svg: withFill(googleAdsRaw, '4285F4') },
  { name: 'Meta', svg: withFill(metaRaw, '0467DF') },
]
