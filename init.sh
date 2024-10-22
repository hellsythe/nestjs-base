docker info > /dev/null 2>&1

# Ensure that Docker is running...
if [ $? -ne 0 ]; then
    echo "Docker no esta corriendo."

    exit 1
fi

echo "Iniciando proyecto..."

git clone https://github.com/nestjs/typescript-starter.git $1 -q
cd $1
rm .git -rf
git init -q
git add . &> /dev/null
git commit -m "Initial commit" &> /dev/null
rm src/app.services.ts
rm src/app.controller.ts
rm src/app.controller.spec.ts

echo "Instalando dependencias..."

docker run -it --rm \
    -v "$(pwd)":/app \
    -w /app \
    node \
    bash -c "npm install &> /dev/null && npm i @sdkconsultoria/nestjs-base && npx cli"


CYAN='\033[0;36m'
LIGHT_CYAN='\033[1;36m'
BOLD='\033[1m'
NC='\033[0m'

echo ""

if sudo -n true 2>/dev/null; then
    sudo chown -R $USER: .
else
    echo -e "${BOLD}Please provide your password so we can make some final adjustments to your application's permissions.${NC}"
    echo ""
    sudo chown -R $USER: .
    echo ""
fi