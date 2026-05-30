# Missing Encoding
Retrieve the photo of Bjoern's cat in "melee combat-mode".

## Solution

Went to the `photowall` page, there we see that there is a photo with an "icon" of a cat but it's doesn't displayed.

We will open the the `devtools` and find the relevant source...

```html
<img _ngcontent-ng-c369711659="" class="image" src="assets/public/images/uploads/ᓚᘏᗢ-#zatschi-#whoneedsfourlegs-1572600969477.jpg" alt="😼 #zatschi #whoneedsfourlegs">
```
the weird symbools on the img-src aren't valid url strings, we must do url-incode to reveice queryable URL, so after twice URL encoding (CYBERCHEF)
Result is `assets/public//images/uploads/%E1%93%9A%E1%98%8F%E1%97%A2%2D%23zatschi%2D%23whoneedsfourlegs%2D1572600969477%2Ejpg`