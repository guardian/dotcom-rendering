git stash

if git show-ref --quiet refs/heads/ghpages; then
    git branch -D gh-pages
fi

git fetch --all
git checkout gh-pages
git checkout master -- public
git commit -m "add public"
git push --force origin gh-pages

git checkout -
git stash apply