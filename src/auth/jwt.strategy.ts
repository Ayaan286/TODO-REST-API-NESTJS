import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy} from "passport-jwt" 
import { JwtService } from "@nestjs/jwt";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly jwtService: JwtService,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "Secret"
        })
    }

    async validate(payload: { email: string }) {
        console.log(payload)
        const user = await this.databaseService.user.findFirst({
            where: {
                email: payload.email,
            },
        });
        return user;
    }
} 