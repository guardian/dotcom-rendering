git stash

if git show-ref --quiet refs/heads/gh-pages; then
    git branch -D gh-pages
fi

git fetch --all
git checkout gh-pages
git pull
git checkout master -- public
git add public
git commit -m "add public"
git push origin gh-pages

git checkout -
git stash apply