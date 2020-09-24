diff=`git diff`

# if local changes
if [[ -n $diff ]]; then
    git stash
fi

if git show-ref --quiet refs/heads/gh-pages; then
    git branch -D gh-pages
fi

git fetch --all
git checkout gh-pages
git pull
git checkout main -- public
git add public
git commit -m "add public"
git push origin gh-pages

git checkout -

# if local changes
if [[ -n $diff ]]; then
    git stash apply
fi