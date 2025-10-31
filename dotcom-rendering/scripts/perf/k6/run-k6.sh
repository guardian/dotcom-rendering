echo "" > k6-output.txt

echo "Running Article AJV vs Zod tests...."

echo "\n------------------------------------" >> k6-output.txt
echo "| Running Article AJV test         |" >> k6-output.txt
echo "------------------------------------" >> k6-output.txt
./k6-bin run k6-article-ajv.mjs
./k6-bin run k6-article-ajv.mjs >> k6-output.txt

echo "\n------------------------------------" >> k6-output.txt
echo "| Running Article Zod test         |" >> k6-output.txt
echo "------------------------------------" >> k6-output.txt
./k6-bin run k6-article-zod.mjs
./k6-bin run k6-article-zod.mjs >> k6-output.txt

echo "Running Front AJV vs Zod tests...."

echo "\n------------------------------------" >> k6-output.txt
echo "| Running Front AJV test           |" >> k6-output.txt
echo "------------------------------------" >> k6-output.txt
./k6-bin run k6-front-ajv.mjs
./k6-bin run k6-front-ajv.mjs >> k6-output.txt

echo "\n------------------------------------" >> k6-output.txt
echo "| Running Front Zod test           |" >> k6-output.txt
echo "------------------------------------" >> k6-output.txt
./k6-bin run k6-front-zod.mjs
./k6-bin run k6-front-zod.mjs >> k6-output.txt

# echo "Running Article AJV vs Valibot tests...."

# echo "\n------------------------------------" >> k6-output.txt
# echo "| Running Article AJV test         |" >> k6-output.txt
# echo "------------------------------------" >> k6-output.txt

# ./k6-bin run k6-article-ajv.mjs
# ./k6-bin run k6-article-ajv.mjs >> k6-output.txt

# echo "\n------------------------------------" >> k6-output.txt
# echo "| Running Article Valibot test     |" >> k6-output.txt
# echo "------------------------------------" >> k6-output.txt

# ./k6-bin run k6-article-valibot.mjs
# ./k6-bin run k6-article-valibot.mjs >> k6-output.txt

# echo "Running Front AJV vs Valibot tests...."

# echo "\n------------------------------------" >> k6-output.txt
# echo "| Running Front AJV test         |" >> k6-output.txt
# echo "------------------------------------" >> k6-output.txt

# ./k6-bin run k6-front-ajv.mjs
# ./k6-bin run k6-front-ajv.mjs >> k6-output.txt

# echo "\n------------------------------------" >> k6-output.txt
# echo "| Running Front Valibot test       |" >> k6-output.txt
# echo "------------------------------------" >> k6-output.txt

# ./k6-bin run k6-front-valibot.mjs
# ./k6-bin run k6-front-valibot.mjs >> k6-output.txt
