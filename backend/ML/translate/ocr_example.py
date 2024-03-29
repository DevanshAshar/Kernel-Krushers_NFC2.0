# import modules
import cv2
import pytesseract
import requests
import numpy as np
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract'
# read image


def image_to_text(url,lang):
    print(url)
    # Download the image using requests
    response = requests.get(url)
    print(response,'response')
    img_array = np.asarray(bytearray(response.content), dtype=np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
    # set configurations
    config = ('-l eng --oem 1 --psm 3')

    # Convert the image to gray scale 
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) 
    
    # OTSU threshold performing
    ret, threshimg = cv2.threshold(gray, 0, 255, cv2.THRESH_OTSU | cv2.THRESH_BINARY_INV) 
    
    # Specifying kernel size and structure shape.  
    rect_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (18, 18)) 
    
    # Appplying dilation on the threshold image 
    dilation = cv2.dilate(threshimg, rect_kernel, iterations = 1) 
    
    # getting contours 
    img_contours, hierarchy = cv2.findContours(dilation, cv2.RETR_EXTERNAL,  
                                                    cv2.CHAIN_APPROX_NONE) 

    img_to_text = ""
    # Loop over contours and crop and extract the text file
    for cnt in img_contours: 
        x, y, w, h = cv2.boundingRect(cnt) 
        # Drawing a rectangle
        rect = cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2) 
        # Cropping the text block  
        cropped_img = img[y:y + h, x:x + w]
        # Applying tesseract OCR on the cropped image 
        text = pytesseract.image_to_string(cropped_img, lang =lang) 
        # updating the text
        img_to_text+=text
    print(img_to_text)
    return img_to_text
# print(image_to_text(''))