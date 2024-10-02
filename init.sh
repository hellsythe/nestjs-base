docker info > /dev/null 2>&1

# Ensure that Docker is running...
if [ $? -ne 0 ]; then
    echo "Docker no esta corriendo."

    exit 1
fi

docker run --rm \
    -v "$(pwd)":/app \
    -w /app \
    node \
    bash -c "git clone https://github.com/nestjs/typescript-starter.git $1 && cd $1 && npm install && rm .git -rf"

cd $1

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