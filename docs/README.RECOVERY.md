# RECOVERY INSTRUCTIONS

If you ever need to restore the site to this stable version, you have multiple options:

## Option 1: Use the recovery script (easiest)

Run the following command from your project directory:

```
./stable-recovery.sh
```

This will automatically restore your site to the stable version that has:
- Reusable CTA button components
- Clean design with no modernization changes
- Working mobile view

## Option 2: Manual restore

If the script doesn't work for some reason, run these commands:

```
git checkout STABLE-BACKUP
git push -f origin STABLE-BACKUP:gh-pages
```

## Option 3: Clone and restore from scratch

If something has gone terribly wrong with your local git repository:

```
git clone https://github.com/robsansom/portfolio.git fresh-portfolio
cd fresh-portfolio
git checkout STABLE-BACKUP
git push -f origin STABLE-BACKUP:gh-pages
```

## IMPORTANT INFORMATION

The stable version is from commit f39a0d4 (March 20th) which includes:
- Reusable CTA button components
- No modernization features
- Clean mobile experience

To check if you're on the stable version, run:
```
git branch
```
You should see `STABLE-BACKUP` with an asterisk next to it.

Always make new changes starting from this stable point.
